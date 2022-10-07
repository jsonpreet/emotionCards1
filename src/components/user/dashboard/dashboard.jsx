// import { Card } from '@app/components/ui/card'
import GraphicEditor from '@app/DesignEditor/GraphicEditor';

const Dashboard = () => {

  return (
    <div className='relative py-2'>
      {/* <Card heading='Cards' classes={`mr-4 mb-4`}/>
      <Card heading='Post Cards' classes={`mr-4 mb-4`}/>
      <Card heading='Users' classes={`mr-4 mb-4`}/>
      <Card heading='Media' classes={`mb-4`}/> */}
      <GraphicEditor/>
    </div>
  )
}

export default Dashboard