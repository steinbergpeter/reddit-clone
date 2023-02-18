import CommunityNotFound from '@/components/Community/CommunityNotFound'
import PageContent from '@/components/layouts/PageContent'
import { auth, firestore } from '@/firebase/clientApp'
import { Community, communityState } from '@/state/recoil/atoms/communitiesAtom'
import { doc, getDoc } from 'firebase/firestore'
import { GetServerSidePropsContext } from 'next'
import { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRecoilState } from 'recoil'

type Props = {
  communityData: Community
}

const CommunityPage = ({ communityData }: Props) => {
  // console.log('Here is the data: ', communityData)

  const [user, loadingUser] = useAuthState(auth)
  const [communityStateValue, setCommunityStateValue] =
    useRecoilState(communityState)

  useEffect(() => {
    setCommunityStateValue((p) => ({
      ...p,
      currentCommunity: communityData,
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [communityData])

  return (
    <>
      {communityData ? (
        <>
          <PageContent communityData={communityData}>
            <>
              <div>LHS</div>
              <div>LHS</div>
              <div>LHS</div>
              <div>LHS</div>
            </>
            <>
              <div>RHS</div>
            </>
          </PageContent>
        </>
      ) : (
        <CommunityNotFound />
      )}
    </>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const communityDocRef = doc(
      firestore,
      'communities',
      context.query.communityId as string
    )
    const communityDoc = await getDoc(communityDocRef)
    return {
      props: {
        communityData: communityDoc.exists()
          ? JSON.parse(
              JSON.stringify({ id: communityDoc.id, ...communityDoc.data() })
            )
          : '',
      },
    }
  } catch (err) {
    if (err instanceof Error) {
      console.log('SSR Error:', err.message)
    } else {
      console.log('unidentified error: ', err)
    }
  }
}

export default CommunityPage
