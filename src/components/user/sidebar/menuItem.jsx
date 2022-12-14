import Link from "next/link"

const MenuItem = ({ title, Icon, link }) => {
  return (
    <div className={`flex flex-col justify-center w-full border-b ${title === 'Dashboard' ? `border-t` : null} border-gray-100 group`}>
      <Link href={link} passHref>
        <a className='cursor-pointer px-4 group-hover:text-black flex text-black flex-row py-3 text-left'>
          <Icon className="mr-2 h-5 w-5 group-hover:text-black text-gray-400 duration-75 delay-75" aria-hidden="true" />
          <span className='text-black group-hover:text-black duration-75 delay-75'>{title}</span>
        </a>
      </Link>
    </div>
  )
}

export default MenuItem