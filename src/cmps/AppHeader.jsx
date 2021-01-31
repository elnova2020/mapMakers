
import { withRouter } from 'react-router-dom'



function _AppHeader() {
    return (
        <nav className="appHeader-nav-color" >
            <div className="appHeader-nav flex justify-between container">
                <h1 className="flex align-center justify-center">MapMarkers</h1>
            </div>
        </nav>
    )
}


export const AppHeader = withRouter(_AppHeader)








