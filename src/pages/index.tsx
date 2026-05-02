import Header from "../components/header"
import Service from "../components/service"

const PrincipalPage = () => {
  return (
    <div className="min-h-screen  bg-white">
      {/* header */}
      <Header />

      <Service/>
    </div>
  )
}

export default PrincipalPage