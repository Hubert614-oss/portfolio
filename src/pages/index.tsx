import Header from "../components/header"
import Service from "../components/service"

const PrincipalPage = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100">
      {/* header */}
      <Header />

      <Service/>
    </div>
  )
}

export default PrincipalPage