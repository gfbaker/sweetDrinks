import React from 'react';
import CategoriesInDb from './CategoriesInDb';
import MayorStock from './MayorStock';

function ContentRowCenter(){
    return (
        <div className="row">
            
            {/*<!-- Last Movie in DB -->*/}
            <MayorStock />
            {/*<!-- End content row last movie in Data Base -->*/}

            {/*<!-- Genres in DB -->*/}
            <CategoriesInDb />
            

        </div>
    )
}

export default ContentRowCenter;