import { communitiesState, Community } from '@/atoms/communitiesAtom'
import CommunityNotFound from '@/components/Community/CommunityNotFound'
import { auth, firestore } from '@/firebase/clientApp'
import { doc, getDoc } from 'firebase/firestore'
import { GetServerSidePropsContext, NextPage } from 'next'
import { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRecoilState } from 'recoil'
import safeJsonStringify from 'safe-json-stringify'
interface CommunityPageProps {
  communityData: Community
}

const CommunityPage: NextPage<CommunityPageProps> = ({ communityData }) => {
  const [user, loadingUser] = useAuthState(auth)
  const [communityStateValue, setCommunityStateValue] = useRecoilState(
    communitiesState
  )

  useEffect(() => {
    setCommunityStateValue(p => ({
      ...p,
      currentCommunity: communityData,
    }))
  }, [communityData])

  if (!communityData) {
    return <CommunityNotFound />
  }

  return (
    <div>
      <h5>
        currentCommunity:{'  '}
        {JSON.stringify(communityStateValue.currentCommunity.id)}
      </h5>
    </div>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  console.log('getServerSideProps called')
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
      console.log('SSR Error:', err)
    } else {
      console.log('unidentified error: ', err)
    }
  }
}

export default CommunityPage
