import { doc, getDoc } from 'firebase/firestore'
import { GetServerSidePropsContext } from 'next'
import React, { useEffect } from 'react'
import { firestore } from '@/firebase/clientApp'
import { communitiesState, Community } from '@/atoms/communitiesAtom'
import safeJsonStringify from 'safe-json-stringify'
import { useRecoilState } from 'recoil'

type Props = {
  communityData: Community
}
const CommunityPage = ({ communityData }: Props) => {
  const [communityStateValue, setCommunityStateValue] = useRecoilState(
    communitiesState
  )

  useEffect(() => {
    setCommunityStateValue(p => ({
      ...p,
      currentCommunity: communityData,
    }))
  }, [communityData])

  return <div>Welcome to {JSON.stringify(communityStateValue)}</div>
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  //get community data and pass it to client
  try {
    const communityDocRef = doc(
      firestore,
      'communities',
      context.query.communityId as string
    )
    const communityDoc = await getDoc(communityDocRef)

    return {
      props: {
        communityData: JSON.parse(
          safeJsonStringify({ id: communityDoc.id, ...communityDoc.data() })
        ),
      },
    }
  } catch (err) {
    if (err instanceof Error) {
      console.error(err)
    } else {
      console.log('unidentified error: ', err)
    }
  }
}

export default CommunityPage
