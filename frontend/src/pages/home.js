import Dog from '../images/dog-header.png'

function Header() {
  return (
    <header className="header">
    <h1 className="header-title-h1">Whats up, Epi-Pup?</h1>
    <div className="header-image">
        <img src={Dog} alt="happy dog cartoon"/>
    </div>
    <section className="home-page-blurb">
      <h2>Hey dog! Welcome to your seizure log.</h2>
      <p>One billion trees worth of paper are thrown away every year in the United States. Keeping a seizure log on paper means you are running the risk of losing important information. Don't take the risk of accidentally losing your log - sign up for a free account and keep a digital copy for both you and your vet!</p>
    </section>
    <div className="home-page-btn-container">
      <button className="sign-up-btn">REGISTER</button>
      <button className="login-btn">SIGN IN</button>
    </div>
  </header>
  )
}

export default Header