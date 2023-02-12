import { communitiesState, Community } from '@/atoms/communitiesAtom'
import { firestore } from '@/firebase/clientApp'
import { doc, getDoc } from 'firebase/firestore'
import { GetServerSidePropsContext } from 'next'
import { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import safeJsonStringify from 'safe-json-stringify'

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

  return (
    <div>
      <h4>communityData: {JSON.stringify(communityData)}</h4>
      <h5>communityStateValue: {JSON.stringify(communityStateValue)}</h5>
    </div>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  //get community data and pass it to client
  try {
    const communityDocRef = doc(
      firestore,
      'communities',
      context.query.communityId as string
    )
    console.log('communityDocRef: ', communityDocRef)
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
      console.log(err)
    } else {
      console.log('unidentified error: ', err)
    }
  }
}

export default CommunityPage
