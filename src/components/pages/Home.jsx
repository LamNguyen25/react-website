import React from 'react'
import { BsSearch } from 'react-icons/bs';
import Navbar from '../Navbar'
import './Home.css'
import img from '../../images/img1.png';
export default function main() {
    return (
        // <div className="container">
        //     <div>
        //          <Navbar/>
        //     </div>
        //     <div className="search-box">
        //         <input 
        //             className="search-input" 
        //             type="search" name="" 
        //             id="" 
        //             placeholder="Search......">
        //         </input>
        //         <BsSearch className="search-icon"/>
        //     </div>          
            
        // </div>
    <>
         <div
            className="home_container"
            >
                <div className="container">
                    <div className="row home-row"
                        style={{display:'flex', flexDirection: 'row'}}
                    >
                     <div className="col">
                         <div className="home-text-wrapper">
                             <div className="top-line">Search Here</div>
                             <div className="search-box">
                                <input 
                                    className="search-input" 
                                    type="search" name="" 
                                    id="" 
                                    placeholder="Search......">
                                </input>
                                <BsSearch className="search-icon"/>
                             </div>       
                         </div>
                     </div>
                    <div className='col'>
                        <div className='home-img-wrapper'>
                            <img src={img} alt={'Maple Leave'} className='home-img' />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </>
        
    )
}
