import React from 'react'
import Doctor from '../images/dog-medicine.png'

function LoadedDashboard() {
  return (
    <div className="mainDashboardContainer">
        <header className="dashboardHeader" style={{
            backgroundImage: `url(${Doctor})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right bottom'
        }}>
            <h5>Welcome back to your</h5>
            <p>Seizure tracking manager</p>
            <button className="startTrackingBtn">Start Tracking</button>
        </header>
    </div>
  )
}

export default LoadedDashboard