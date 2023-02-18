import { useState, useEffect } from 'react'

import {
  doc,
  getDocs,
  increment,
  writeBatch,
  collection,
} from '@firebase/firestore'
import { useRecoilState } from 'recoil'
import { communityState } from '@/state/recoil/atoms/communitiesAtom'
import type {
  Community,
  CommunitySnippet,
} from '@/state/recoil/atoms/communitiesAtom'

import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, firestore } from '@/firebase/clientApp'

const useCommunityData = () => {
  const [user] = useAuthState(auth)
  const [communityStateValue, setCommunityStateValue] =
    useRecoilState(communityState)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!user) return
    getMySnippets()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  const getMySnippets = async () => {
    setIsLoading(true)
    setError('')
    try {
      const snippetDocs = await getDocs(
        collection(firestore, `users/${user?.uid}/communitySnippets`)
      )
      const snippets = snippetDocs.docs.map((doc) => ({ ...doc.data() }))
      setCommunityStateValue((p) => ({
        ...p,
        currentUsersSnippets: snippets as Array<CommunitySnippet>,
      }))
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message)
        setError(err.message)
      } else {
        console.log('getMySnippets error: ', err)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const joinCommunity = async (communityData: Community) => {
    console.log('JOINING COMMUNITY: ', communityData.id)
    try {
      // batch write to Firebase
      const batch = writeBatch(firestore)
      // create a new community snippet
      const newSnippet: CommunitySnippet = {
        communityId: communityData.id,
        isModerator: false,
        imageURL: communityData.imageURL || '',
      }
      // add to user's snippets
      batch.set(
        doc(
          firestore,
          `users/${user?.uid}/communitySnippets`,
          communityData.id
        ),
        newSnippet
      )
      // +1 number of members of community
      batch.update(doc(firestore, 'communities', communityData.id), {
        numberOfMembers: increment(1),
      })
      await batch.commit()
      // update recoil state = add community to communityState.mySnippets
      setCommunityStateValue((p) => ({
        ...p,
        currentUsersSnippets: [...p.currentUsersSnippets, newSnippet],
      }))
    } catch (error) {
      if (error instanceof Error) {
        console.log(`JoinCommunity error: ${error}`)
        setError(error.message)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const leaveCommunity = async (communityId: string) => {
    try {
      // batch write to Firebase
      const batch = writeBatch(firestore)
      // deleting community snippet from user's snippets
      batch.delete(
        doc(firestore, `users/${user?.uid}/communitySnippets`, communityId)
      )
      // -1 number of members of community
      batch.update(doc(firestore, 'communities', communityId), {
        numberOfMembers: increment(-1),
      })
      await batch.commit()
      // update recoil state = remove community from communityState.mySnippets
      setCommunityStateValue((p) => ({
        ...p,
        currentUsersSnippets: p.currentUsersSnippets.filter(
          (snippet) => snippet.communityId === communityId
        ),
      }))
    } catch (error) {
      if (error instanceof Error) {
        console.log(`LeaveCommunity error: ${error.message}`)
        setError(error.message)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const onJoinOrLeaveCommunity = (
    communityData: Community,
    isJoined: boolean
  ) => {
    //is user signed in?
    //if not => open auth modal
    // if yes, are they part of this community?
    //if yes, they must want to leave community
    if (isJoined) {
      leaveCommunity(communityData.id)
      return
    }
    //if no, they must want to join community
    joinCommunity(communityData)
  }

  return {
    communityStateValue,
    onJoinOrLeaveCommunity,
    isLoading,
  }
}

export default useCommunityData
