import React from 'react';
import LastMovieInDb from './LastMovieInDb';
import UsersInDb from './UsersInDb';

function ContentRowCenter(){
    return (
        <div className="row">
            
            {/*<!-- Last Movie in DB -->*/}
            <LastMovieInDb />
            {/*<!-- End content row last movie in Data Base -->*/}

            {/*<!-- Genres in DB -->*/}
            <UsersInDb />

        </div>
    )
}

export default ContentRowCenter;