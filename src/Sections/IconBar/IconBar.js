import './IconBar.css'
import {NavLink, useLocation} from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import Cookie from "cookie-universal"

const IconBar = () => {
  const pathname=useLocation().pathname;
  const cookie=Cookie(); 
  const navigate=useNavigate();

  console.log(pathname);
  if (pathname==='/Home'||pathname==='/AllDoctors'||pathname==='/DoctorReservedAppoinments'||
  pathname==='/EditAppoinments'||pathname==='/Devices'||pathname==='/DevicesReservedAppointments'
  ||pathname==='/Patients'||pathname==='/PatientAppointments'||pathname==='/EditDeviceAppointments'||pathname==='/EditPatient'
  ||pathname==='/DoctorsAppManager'||pathname==='/AddDoctor'||pathname==='/AddTherapist'||pathname==='/DeviceAppManager'
  ||pathname==='/AddDevice'||pathname==='/Offers'||pathname==='/EditDoctor'||pathname==='/EditTherapist'
  ||pathname==='/EditDevice' ||pathname==='/AddOffer'||pathname==='/Statistics'){
  
   
  
  
   return (
    
      <div className='IconBar'>
      <div className='LogoIcon'>
      {
   (() => {
       if (pathname==='/DoctorsAppManager'||pathname==='/AddDoctor'||pathname==='/AddTherapist'
       ||pathname==='/DeviceAppManager'||pathname==='/AddDevice'||pathname==='/Offers'||pathname==='/EditDoctor'
       ||pathname==='/EditTherapist' ||pathname==='/EditDevice'||pathname==='/Statistics')
          return <svg width="50" className='' height="50" viewBox="0 0 65 65" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g filter="url(#filter0_d_275_1220)">  
          <path d="M60.2782 0.0920173C44.3261 -0.667371 34.3879 10.4085 32.2671 18.9516C25.3674 1.39071 11.5992 -0.507758 4.25607 0.0920173C2.10396 15.6292 13.9731 26.0708 22.7719 28.5367C7.32636 32.2409 4.25607 47.9033 4.25607 56.0645C22.7719 56.0645 29.6403 44.5809 32.2671 37.9363C39.1037 54.2631 53.7898 56.8556 60.2782 56.0645C61.0378 38.9783 48.2508 30.5934 41.7624 28.5367C48.6517 26.215 61.9999 17.2756 60.2782 0.0920173Z" fill="white"/>
          </g>
          <defs>
          <filter id="filter0_d_275_1220" x="0" y="0" width="64.4302" height="64.19" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
         <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
         <feOffset dy="4"/>
         <feGaussianBlur stdDeviation="2"/>
         <feComposite in2="hardAlpha" operator="out"/>
         <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
         <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_275_1220"/>
         <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_275_1220" result="shape"/>
         </filter>
         </defs>
        </svg>
       else
       return <svg width="50" className='' height="50" viewBox="0 0 65 65" fill="none" xmlns="http://www.w3.org/2000/svg">
       <g filter="url(#filter0_d_275_1220)">  
       <NavLink exact="true" to='/Home'>
       <path d="M60.2782 0.0920173C44.3261 -0.667371 34.3879 10.4085 32.2671 18.9516C25.3674 1.39071 11.5992 -0.507758 4.25607 0.0920173C2.10396 15.6292 13.9731 26.0708 22.7719 28.5367C7.32636 32.2409 4.25607 47.9033 4.25607 56.0645C22.7719 56.0645 29.6403 44.5809 32.2671 37.9363C39.1037 54.2631 53.7898 56.8556 60.2782 56.0645C61.0378 38.9783 48.2508 30.5934 41.7624 28.5367C48.6517 26.215 61.9999 17.2756 60.2782 0.0920173Z" fill="white"/>
       </NavLink>
       </g>
       <defs>
       <filter id="filter0_d_275_1220" x="0" y="0" width="64.4302" height="64.19" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
       <feFlood floodOpacity="0" result="BackgroundImageFix"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset dy="4"/>
      <feGaussianBlur stdDeviation="2"/>
      <feComposite in2="hardAlpha" operator="out"/>
      <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
      <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_275_1220"/>
      <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_275_1220" result="shape"/>
      </filter>
      </defs>
     </svg>
      
  
   })()
}
      

        </div>

        <div className='DoctorIcon'>
        {
   (() => {
       if (pathname==='/DoctorReservedAppoinments'||pathname==='/EditAppoinments')
          return  <svg className='active'  width="36" height="44" viewBox="0 0 49 53" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g filter="url(#filter0_d_280_258)">
          <NavLink exact="true" to='/AllDoctors'>
          <path d="M24.5 22.5C30.9703 22.5 36.2143 17.4639 36.2143 11.25C36.2143 5.03613 30.9703 0 24.5 0C18.0297 0 12.7857 5.03613 12.7857 11.25C12.7857 17.4639 18.0297 22.5 24.5 22.5ZM13.5179 37.2656C13.5179 38.4346 14.4971 39.375 15.7143 39.375C16.9315 39.375 17.9107 38.4346 17.9107 37.2656C17.9107 36.0967 16.9315 35.1562 15.7143 35.1562C14.4971 35.1562 13.5179 36.0967 13.5179 37.2656ZM33.2857 25.3652V29.6719C36.6261 30.3223 39.1429 33.1699 39.1429 36.5625V40.2275C39.1429 40.8955 38.6487 41.4756 37.9623 41.6074L35.0154 42.1699C34.6219 42.249 34.2375 42.0029 34.1551 41.6162L33.8714 40.2363C33.7891 39.8584 34.0453 39.4805 34.448 39.4102L36.2143 39.0674V36.5625C36.2143 31.043 27.4286 30.8408 27.4286 36.7295V39.0762L29.1949 39.4189C29.5884 39.498 29.8446 39.8672 29.7714 40.2451L29.4877 41.625C29.4054 42.0029 29.021 42.249 28.6275 42.1787L25.7721 41.8096C25.0491 41.7129 24.5092 41.124 24.5092 40.4121V36.5625C24.5092 33.1699 27.0259 30.3311 30.3663 29.6719V25.6992C30.165 25.7607 29.9636 25.7959 29.7623 25.8662C28.115 26.4199 26.3487 26.7275 24.5092 26.7275C22.6696 26.7275 20.9033 26.4199 19.256 25.8662C18.5788 25.6377 17.8924 25.4971 17.1877 25.4092V32.5811C19.3018 33.1875 20.8484 35.0508 20.8484 37.2744C20.8484 39.9902 18.5513 42.1963 15.7234 42.1963C12.8955 42.1963 10.5984 39.9902 10.5984 37.2744C10.5984 35.0508 12.1451 33.1875 14.2592 32.5811V25.5146C8.43862 26.4551 4 31.2715 4 37.125V41.0625C4 43.2334 5.83951 45 8.1 45H40.9C43.1605 45 45 43.2334 45 41.0625V37.125C45 30.7969 39.8018 25.6729 33.2857 25.3652Z" fill="white"/>
          </NavLink>
          </g>
          <defs>
          <filter id="filter0_d_280_258" x="0" y="0" width="49" height="53" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dy="4"/>
          <feGaussianBlur stdDeviation="2"/>
          <feComposite in2="hardAlpha" operator="out"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_280_258"/>
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_280_258" result="shape"/>
          </filter>
          </defs>
          </svg>
       if (pathname==='/DoctorsAppManager'||pathname==='/AddDoctor'||pathname==='/AddTherapist'||pathname==='/EditDoctor'||pathname==='/EditTherapist')
       return  <svg className='active'  width="36" height="44" viewBox="0 0 49 53" fill="none" xmlns="http://www.w3.org/2000/svg">
       <g filter="url(#filter0_d_280_258)">
       <NavLink exact="true" to='/DoctorsAppManager'>
       <path d="M24.5 22.5C30.9703 22.5 36.2143 17.4639 36.2143 11.25C36.2143 5.03613 30.9703 0 24.5 0C18.0297 0 12.7857 5.03613 12.7857 11.25C12.7857 17.4639 18.0297 22.5 24.5 22.5ZM13.5179 37.2656C13.5179 38.4346 14.4971 39.375 15.7143 39.375C16.9315 39.375 17.9107 38.4346 17.9107 37.2656C17.9107 36.0967 16.9315 35.1562 15.7143 35.1562C14.4971 35.1562 13.5179 36.0967 13.5179 37.2656ZM33.2857 25.3652V29.6719C36.6261 30.3223 39.1429 33.1699 39.1429 36.5625V40.2275C39.1429 40.8955 38.6487 41.4756 37.9623 41.6074L35.0154 42.1699C34.6219 42.249 34.2375 42.0029 34.1551 41.6162L33.8714 40.2363C33.7891 39.8584 34.0453 39.4805 34.448 39.4102L36.2143 39.0674V36.5625C36.2143 31.043 27.4286 30.8408 27.4286 36.7295V39.0762L29.1949 39.4189C29.5884 39.498 29.8446 39.8672 29.7714 40.2451L29.4877 41.625C29.4054 42.0029 29.021 42.249 28.6275 42.1787L25.7721 41.8096C25.0491 41.7129 24.5092 41.124 24.5092 40.4121V36.5625C24.5092 33.1699 27.0259 30.3311 30.3663 29.6719V25.6992C30.165 25.7607 29.9636 25.7959 29.7623 25.8662C28.115 26.4199 26.3487 26.7275 24.5092 26.7275C22.6696 26.7275 20.9033 26.4199 19.256 25.8662C18.5788 25.6377 17.8924 25.4971 17.1877 25.4092V32.5811C19.3018 33.1875 20.8484 35.0508 20.8484 37.2744C20.8484 39.9902 18.5513 42.1963 15.7234 42.1963C12.8955 42.1963 10.5984 39.9902 10.5984 37.2744C10.5984 35.0508 12.1451 33.1875 14.2592 32.5811V25.5146C8.43862 26.4551 4 31.2715 4 37.125V41.0625C4 43.2334 5.83951 45 8.1 45H40.9C43.1605 45 45 43.2334 45 41.0625V37.125C45 30.7969 39.8018 25.6729 33.2857 25.3652Z" fill="white"/>
       </NavLink>
       </g>
       <defs>
       <filter id="filter0_d_280_258" x="0" y="0" width="49" height="53" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
       <feFlood floodOpacity="0" result="BackgroundImageFix"/>
       <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
       <feOffset dy="4"/>
       <feGaussianBlur stdDeviation="2"/>
       <feComposite in2="hardAlpha" operator="out"/>
       <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
       <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_280_258"/>
       <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_280_258" result="shape"/>
       </filter>
       </defs>
       </svg> 
        if (pathname==='/DeviceAppManager' ||pathname==='/EditDevice'||pathname==='/AddDevice'||pathname==='/Offers'||pathname==='/AddOffer')
        return  <svg  width="36" height="44" viewBox="0 0 49 53" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_d_280_258)">
        <NavLink exact="true" to='/DoctorsAppManager'>
        <path d="M24.5 22.5C30.9703 22.5 36.2143 17.4639 36.2143 11.25C36.2143 5.03613 30.9703 0 24.5 0C18.0297 0 12.7857 5.03613 12.7857 11.25C12.7857 17.4639 18.0297 22.5 24.5 22.5ZM13.5179 37.2656C13.5179 38.4346 14.4971 39.375 15.7143 39.375C16.9315 39.375 17.9107 38.4346 17.9107 37.2656C17.9107 36.0967 16.9315 35.1562 15.7143 35.1562C14.4971 35.1562 13.5179 36.0967 13.5179 37.2656ZM33.2857 25.3652V29.6719C36.6261 30.3223 39.1429 33.1699 39.1429 36.5625V40.2275C39.1429 40.8955 38.6487 41.4756 37.9623 41.6074L35.0154 42.1699C34.6219 42.249 34.2375 42.0029 34.1551 41.6162L33.8714 40.2363C33.7891 39.8584 34.0453 39.4805 34.448 39.4102L36.2143 39.0674V36.5625C36.2143 31.043 27.4286 30.8408 27.4286 36.7295V39.0762L29.1949 39.4189C29.5884 39.498 29.8446 39.8672 29.7714 40.2451L29.4877 41.625C29.4054 42.0029 29.021 42.249 28.6275 42.1787L25.7721 41.8096C25.0491 41.7129 24.5092 41.124 24.5092 40.4121V36.5625C24.5092 33.1699 27.0259 30.3311 30.3663 29.6719V25.6992C30.165 25.7607 29.9636 25.7959 29.7623 25.8662C28.115 26.4199 26.3487 26.7275 24.5092 26.7275C22.6696 26.7275 20.9033 26.4199 19.256 25.8662C18.5788 25.6377 17.8924 25.4971 17.1877 25.4092V32.5811C19.3018 33.1875 20.8484 35.0508 20.8484 37.2744C20.8484 39.9902 18.5513 42.1963 15.7234 42.1963C12.8955 42.1963 10.5984 39.9902 10.5984 37.2744C10.5984 35.0508 12.1451 33.1875 14.2592 32.5811V25.5146C8.43862 26.4551 4 31.2715 4 37.125V41.0625C4 43.2334 5.83951 45 8.1 45H40.9C43.1605 45 45 43.2334 45 41.0625V37.125C45 30.7969 39.8018 25.6729 33.2857 25.3652Z" fill="white"/>
        </NavLink>
        </g>
        <defs>
        <filter id="filter0_d_280_258" x="0" y="0" width="49" height="53" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset dy="4"/>
        <feGaussianBlur stdDeviation="2"/>
        <feComposite in2="hardAlpha" operator="out"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_280_258"/>
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_280_258" result="shape"/>
        </filter>
        </defs>
        </svg>  
       if(pathname==='/Statistics')
         return null    
       else 
          return <svg  width="36" height="44" viewBox="0 0 49 53" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g filter="url(#filter0_d_280_258)">
          <NavLink exact="true" to='/AllDoctors'>
          <path d="M24.5 22.5C30.9703 22.5 36.2143 17.4639 36.2143 11.25C36.2143 5.03613 30.9703 0 24.5 0C18.0297 0 12.7857 5.03613 12.7857 11.25C12.7857 17.4639 18.0297 22.5 24.5 22.5ZM13.5179 37.2656C13.5179 38.4346 14.4971 39.375 15.7143 39.375C16.9315 39.375 17.9107 38.4346 17.9107 37.2656C17.9107 36.0967 16.9315 35.1562 15.7143 35.1562C14.4971 35.1562 13.5179 36.0967 13.5179 37.2656ZM33.2857 25.3652V29.6719C36.6261 30.3223 39.1429 33.1699 39.1429 36.5625V40.2275C39.1429 40.8955 38.6487 41.4756 37.9623 41.6074L35.0154 42.1699C34.6219 42.249 34.2375 42.0029 34.1551 41.6162L33.8714 40.2363C33.7891 39.8584 34.0453 39.4805 34.448 39.4102L36.2143 39.0674V36.5625C36.2143 31.043 27.4286 30.8408 27.4286 36.7295V39.0762L29.1949 39.4189C29.5884 39.498 29.8446 39.8672 29.7714 40.2451L29.4877 41.625C29.4054 42.0029 29.021 42.249 28.6275 42.1787L25.7721 41.8096C25.0491 41.7129 24.5092 41.124 24.5092 40.4121V36.5625C24.5092 33.1699 27.0259 30.3311 30.3663 29.6719V25.6992C30.165 25.7607 29.9636 25.7959 29.7623 25.8662C28.115 26.4199 26.3487 26.7275 24.5092 26.7275C22.6696 26.7275 20.9033 26.4199 19.256 25.8662C18.5788 25.6377 17.8924 25.4971 17.1877 25.4092V32.5811C19.3018 33.1875 20.8484 35.0508 20.8484 37.2744C20.8484 39.9902 18.5513 42.1963 15.7234 42.1963C12.8955 42.1963 10.5984 39.9902 10.5984 37.2744C10.5984 35.0508 12.1451 33.1875 14.2592 32.5811V25.5146C8.43862 26.4551 4 31.2715 4 37.125V41.0625C4 43.2334 5.83951 45 8.1 45H40.9C43.1605 45 45 43.2334 45 41.0625V37.125C45 30.7969 39.8018 25.6729 33.2857 25.3652Z" fill="white"/>
          </NavLink>
          </g>
          <defs>
          <filter id="filter0_d_280_258" x="0" y="0" width="49" height="53" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dy="4"/>
          <feGaussianBlur stdDeviation="2"/>
          <feComposite in2="hardAlpha" operator="out"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_280_258"/>
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_280_258" result="shape"/>
          </filter>
          </defs>
          </svg>
   })()
}
       

        </div>

        <div className='DeviceIcon'>
        {
   (() => {
       if (pathname==='/Devices'||pathname==='/DevicesReservedAppointments'||pathname==='/EditDeviceAppointments')
          return <svg className='active' width="39" height="35" viewBox="0 0 52 53" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g filter="url(#filter0_d_280_259)">
            <NavLink exact="true" to='/Devices'>
          <path d="M42.4227 9.84183C39.4836 9.88578 37.0688 12.3381 37.0086 15.3441C36.9656 17.4799 38.0828 19.3521 39.7586 20.3365V30.2336C39.7586 35.27 35.4445 39.3747 30.1336 39.3747C24.9773 39.3747 20.7492 35.4985 20.5172 30.6555C26.7734 29.337 31.5 23.659 31.5 16.8735V3.21452C31.5 2.21251 30.8039 1.34234 29.8414 1.14897L24.4359 0.0414918C23.3188 -0.187036 22.2359 0.551285 22.0125 1.69393L21.7375 3.07388C21.5141 4.21652 22.2359 5.32401 23.3531 5.55253L25.9914 6.0887V16.7592C25.9914 21.4089 22.3648 25.2587 17.8188 25.3026C13.2297 25.3466 9.49141 21.5495 9.49141 16.8647V6.09749L12.1297 5.56132C13.2469 5.3328 13.9688 4.22531 13.7453 3.08267L13.4789 1.70272C13.2555 0.560075 12.1727 -0.178247 11.0555 0.0502813L5.65859 1.14018C4.69609 1.34234 4 2.20372 4 3.21452V16.8735C4 23.6678 8.73516 29.3546 15.0086 30.6555C15.232 38.6012 21.9266 45 30.125 45C38.4609 45 45.25 38.3727 45.25 30.2336V20.3365C46.8914 19.3609 48 17.5503 48 15.4671C48 12.3293 45.4906 9.79788 42.4227 9.84183ZM42.5 16.8735C41.7438 16.8735 41.125 16.2406 41.125 15.4671C41.125 14.6937 41.7438 14.0608 42.5 14.0608C43.2562 14.0608 43.875 14.6937 43.875 15.4671C43.875 16.2406 43.2562 16.8735 42.5 16.8735Z" fill="white"/>
          </NavLink>
          </g>
          <defs>
          <filter id="filter0_d_280_259" x="0" y="0" width="52" height="53" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dy="4"/>
          <feGaussianBlur stdDeviation="2"/>
          <feComposite in2="hardAlpha" operator="out"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_280_259"/>
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_280_259" result="shape"/>
          </filter>
          </defs>
          </svg> 
        if (pathname==='/DeviceAppManager'||pathname==='/AddDevice' ||pathname==='/EditDevice')
        return <svg className='active' width="39" height="35" viewBox="0 0 52 53" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_d_280_259)">
          <NavLink exact="true" to='/DeviceAppManager'>
        <path d="M42.4227 9.84183C39.4836 9.88578 37.0688 12.3381 37.0086 15.3441C36.9656 17.4799 38.0828 19.3521 39.7586 20.3365V30.2336C39.7586 35.27 35.4445 39.3747 30.1336 39.3747C24.9773 39.3747 20.7492 35.4985 20.5172 30.6555C26.7734 29.337 31.5 23.659 31.5 16.8735V3.21452C31.5 2.21251 30.8039 1.34234 29.8414 1.14897L24.4359 0.0414918C23.3188 -0.187036 22.2359 0.551285 22.0125 1.69393L21.7375 3.07388C21.5141 4.21652 22.2359 5.32401 23.3531 5.55253L25.9914 6.0887V16.7592C25.9914 21.4089 22.3648 25.2587 17.8188 25.3026C13.2297 25.3466 9.49141 21.5495 9.49141 16.8647V6.09749L12.1297 5.56132C13.2469 5.3328 13.9688 4.22531 13.7453 3.08267L13.4789 1.70272C13.2555 0.560075 12.1727 -0.178247 11.0555 0.0502813L5.65859 1.14018C4.69609 1.34234 4 2.20372 4 3.21452V16.8735C4 23.6678 8.73516 29.3546 15.0086 30.6555C15.232 38.6012 21.9266 45 30.125 45C38.4609 45 45.25 38.3727 45.25 30.2336V20.3365C46.8914 19.3609 48 17.5503 48 15.4671C48 12.3293 45.4906 9.79788 42.4227 9.84183ZM42.5 16.8735C41.7438 16.8735 41.125 16.2406 41.125 15.4671C41.125 14.6937 41.7438 14.0608 42.5 14.0608C43.2562 14.0608 43.875 14.6937 43.875 15.4671C43.875 16.2406 43.2562 16.8735 42.5 16.8735Z" fill="white"/>
        </NavLink>
        </g>
        <defs>
        <filter id="filter0_d_280_259" x="0" y="0" width="52" height="53" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset dy="4"/>
        <feGaussianBlur stdDeviation="2"/>
        <feComposite in2="hardAlpha" operator="out"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_280_259"/>
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_280_259" result="shape"/>
        </filter>
        </defs>
        </svg>   

        if (pathname==='/DoctorsAppManager'||pathname==='/AddDoctor'||pathname==='/AddTherapist'||pathname==='/Offers'||pathname==='/AddOffer'||pathname==='/EditDoctor'||pathname==='/EditTherapist')
        return <svg width="39" height="35" viewBox="0 0 52 53" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_d_280_259)">
        <NavLink exact="true" to='/DeviceAppManager'>
        <path d="M42.4227 9.84183C39.4836 9.88578 37.0688 12.3381 37.0086 15.3441C36.9656 17.4799 38.0828 19.3521 39.7586 20.3365V30.2336C39.7586 35.27 35.4445 39.3747 30.1336 39.3747C24.9773 39.3747 20.7492 35.4985 20.5172 30.6555C26.7734 29.337 31.5 23.659 31.5 16.8735V3.21452C31.5 2.21251 30.8039 1.34234 29.8414 1.14897L24.4359 0.0414918C23.3188 -0.187036 22.2359 0.551285 22.0125 1.69393L21.7375 3.07388C21.5141 4.21652 22.2359 5.32401 23.3531 5.55253L25.9914 6.0887V16.7592C25.9914 21.4089 22.3648 25.2587 17.8188 25.3026C13.2297 25.3466 9.49141 21.5495 9.49141 16.8647V6.09749L12.1297 5.56132C13.2469 5.3328 13.9688 4.22531 13.7453 3.08267L13.4789 1.70272C13.2555 0.560075 12.1727 -0.178247 11.0555 0.0502813L5.65859 1.14018C4.69609 1.34234 4 2.20372 4 3.21452V16.8735C4 23.6678 8.73516 29.3546 15.0086 30.6555C15.232 38.6012 21.9266 45 30.125 45C38.4609 45 45.25 38.3727 45.25 30.2336V20.3365C46.8914 19.3609 48 17.5503 48 15.4671C48 12.3293 45.4906 9.79788 42.4227 9.84183ZM42.5 16.8735C41.7438 16.8735 41.125 16.2406 41.125 15.4671C41.125 14.6937 41.7438 14.0608 42.5 14.0608C43.2562 14.0608 43.875 14.6937 43.875 15.4671C43.875 16.2406 43.2562 16.8735 42.5 16.8735Z" fill="white"/>
        </NavLink>
        </g>
        <defs>
        <filter id="filter0_d_280_259" x="0" y="0" width="52" height="53" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset dy="4"/>
        <feGaussianBlur stdDeviation="2"/>
        <feComposite in2="hardAlpha" operator="out"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_280_259"/>
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_280_259" result="shape"/>
        </filter>
        </defs>
        </svg>  
        if(pathname==='/Statistics')
         return null  
       else 
          return <svg width="39" height="35" viewBox="0 0 52 53" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g filter="url(#filter0_d_280_259)">
          <NavLink exact="true" to='/Devices'>
          <path d="M42.4227 9.84183C39.4836 9.88578 37.0688 12.3381 37.0086 15.3441C36.9656 17.4799 38.0828 19.3521 39.7586 20.3365V30.2336C39.7586 35.27 35.4445 39.3747 30.1336 39.3747C24.9773 39.3747 20.7492 35.4985 20.5172 30.6555C26.7734 29.337 31.5 23.659 31.5 16.8735V3.21452C31.5 2.21251 30.8039 1.34234 29.8414 1.14897L24.4359 0.0414918C23.3188 -0.187036 22.2359 0.551285 22.0125 1.69393L21.7375 3.07388C21.5141 4.21652 22.2359 5.32401 23.3531 5.55253L25.9914 6.0887V16.7592C25.9914 21.4089 22.3648 25.2587 17.8188 25.3026C13.2297 25.3466 9.49141 21.5495 9.49141 16.8647V6.09749L12.1297 5.56132C13.2469 5.3328 13.9688 4.22531 13.7453 3.08267L13.4789 1.70272C13.2555 0.560075 12.1727 -0.178247 11.0555 0.0502813L5.65859 1.14018C4.69609 1.34234 4 2.20372 4 3.21452V16.8735C4 23.6678 8.73516 29.3546 15.0086 30.6555C15.232 38.6012 21.9266 45 30.125 45C38.4609 45 45.25 38.3727 45.25 30.2336V20.3365C46.8914 19.3609 48 17.5503 48 15.4671C48 12.3293 45.4906 9.79788 42.4227 9.84183ZM42.5 16.8735C41.7438 16.8735 41.125 16.2406 41.125 15.4671C41.125 14.6937 41.7438 14.0608 42.5 14.0608C43.2562 14.0608 43.875 14.6937 43.875 15.4671C43.875 16.2406 43.2562 16.8735 42.5 16.8735Z" fill="white"/>
          </NavLink>
          </g>
          <defs>
          <filter id="filter0_d_280_259" x="0" y="0" width="52" height="53" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dy="4"/>
          <feGaussianBlur stdDeviation="2"/>
          <feComposite in2="hardAlpha" operator="out"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_280_259"/>
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_280_259" result="shape"/>
          </filter>
          </defs>
          </svg>
  
   })()
}
        
        </div>
        
        <div className='AddPatientIcon'> 
        {
   (() => {
       if (pathname==='/Patients'||pathname==='/PatientAppointments'||pathname==='/EditPatient')
          return <svg className='active' width="40" height="34" viewBox="0 0 53 53" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g filter="url(#filter0_d_280_261)">
          <NavLink exact="true" to='/Patients'>
          <path d="M45.25 0H7.75C5.67969 0 4 2.1596 4 4.82143V40.1786C4 42.8404 5.67969 45 7.75 45H45.25C47.3203 45 49 42.8404 49 40.1786V4.82143C49 2.1596 47.3203 0 45.25 0ZM17.75 9.64286C20.5078 9.64286 22.75 12.5257 22.75 16.0714C22.75 19.6172 20.5078 22.5 17.75 22.5C14.9922 22.5 12.75 19.6172 12.75 16.0714C12.75 12.5257 14.9922 9.64286 17.75 9.64286ZM26.5 33.4286C26.5 34.4933 25.7188 35.3571 24.75 35.3571H10.75C9.78125 35.3571 9 34.4933 9 33.4286V31.5C9 28.3058 11.3516 25.7143 14.25 25.7143H14.6406C15.6016 26.2266 16.6484 26.5179 17.75 26.5179C18.8516 26.5179 19.9062 26.2266 20.8594 25.7143H21.25C24.1484 25.7143 26.5 28.3058 26.5 31.5V33.4286ZM44 28.125C44 28.567 43.7188 28.9286 43.375 28.9286H32.125C31.7812 28.9286 31.5 28.567 31.5 28.125V26.5179C31.5 26.0759 31.7812 25.7143 32.125 25.7143H43.375C43.7188 25.7143 44 26.0759 44 26.5179V28.125ZM44 21.6964C44 22.1384 43.7188 22.5 43.375 22.5H32.125C31.7812 22.5 31.5 22.1384 31.5 21.6964V20.0893C31.5 19.6473 31.7812 19.2857 32.125 19.2857H43.375C43.7188 19.2857 44 19.6473 44 20.0893V21.6964ZM44 15.2679C44 15.7098 43.7188 16.0714 43.375 16.0714H32.125C31.7812 16.0714 31.5 15.7098 31.5 15.2679V13.6607C31.5 13.2188 31.7812 12.8571 32.125 12.8571H43.375C43.7188 12.8571 44 13.2188 44 13.6607V15.2679Z" fill="white"/>
          </NavLink>
          </g>
          <defs>
          <filter id="filter0_d_280_261" x="0" y="0" width="53" height="53" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dy="4"/>
          <feGaussianBlur stdDeviation="2"/>
          <feComposite in2="hardAlpha" operator="out"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_280_261"/>
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_280_261" result="shape"/>
          </filter>
          </defs>
          </svg>
       if (pathname==='/Offers'||pathname==='/AddOffer')
       return <svg className='active' width="40" height="34" viewBox="0 0 53 53" fill="none" xmlns="http://www.w3.org/2000/svg">
       <g filter="url(#filter0_d_280_261)">
       <NavLink exact="true" to='/Offers'>
       <path d="M45.25 0H7.75C5.67969 0 4 2.1596 4 4.82143V40.1786C4 42.8404 5.67969 45 7.75 45H45.25C47.3203 45 49 42.8404 49 40.1786V4.82143C49 2.1596 47.3203 0 45.25 0ZM17.75 9.64286C20.5078 9.64286 22.75 12.5257 22.75 16.0714C22.75 19.6172 20.5078 22.5 17.75 22.5C14.9922 22.5 12.75 19.6172 12.75 16.0714C12.75 12.5257 14.9922 9.64286 17.75 9.64286ZM26.5 33.4286C26.5 34.4933 25.7188 35.3571 24.75 35.3571H10.75C9.78125 35.3571 9 34.4933 9 33.4286V31.5C9 28.3058 11.3516 25.7143 14.25 25.7143H14.6406C15.6016 26.2266 16.6484 26.5179 17.75 26.5179C18.8516 26.5179 19.9062 26.2266 20.8594 25.7143H21.25C24.1484 25.7143 26.5 28.3058 26.5 31.5V33.4286ZM44 28.125C44 28.567 43.7188 28.9286 43.375 28.9286H32.125C31.7812 28.9286 31.5 28.567 31.5 28.125V26.5179C31.5 26.0759 31.7812 25.7143 32.125 25.7143H43.375C43.7188 25.7143 44 26.0759 44 26.5179V28.125ZM44 21.6964C44 22.1384 43.7188 22.5 43.375 22.5H32.125C31.7812 22.5 31.5 22.1384 31.5 21.6964V20.0893C31.5 19.6473 31.7812 19.2857 32.125 19.2857H43.375C43.7188 19.2857 44 19.6473 44 20.0893V21.6964ZM44 15.2679C44 15.7098 43.7188 16.0714 43.375 16.0714H32.125C31.7812 16.0714 31.5 15.7098 31.5 15.2679V13.6607C31.5 13.2188 31.7812 12.8571 32.125 12.8571H43.375C43.7188 12.8571 44 13.2188 44 13.6607V15.2679Z" fill="white"/>
       </NavLink>
       </g>
       <defs>
       <filter id="filter0_d_280_261" x="0" y="0" width="53" height="53" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
       <feFlood floodOpacity="0" result="BackgroundImageFix"/>
       <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
       <feOffset dy="4"/>
       <feGaussianBlur stdDeviation="2"/>
       <feComposite in2="hardAlpha" operator="out"/>
       <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
       <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_280_261"/>
       <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_280_261" result="shape"/>
       </filter>
       </defs>
       </svg>    
       if (pathname==='/DoctorsAppManager'||pathname==='/AddDoctor'||pathname==='/AddTherapist'||pathname==='/DeviceAppManager'||pathname==='/AddDevice' ||pathname==='/EditDevice'||pathname==='/EditDoctor'||pathname==='/EditTherapist')
       return <svg  width="40" height="34" viewBox="0 0 53 53" fill="none" xmlns="http://www.w3.org/2000/svg">
       <g filter="url(#filter0_d_280_261)">
       <NavLink exact="true" to='/Offers'>
       <path d="M45.25 0H7.75C5.67969 0 4 2.1596 4 4.82143V40.1786C4 42.8404 5.67969 45 7.75 45H45.25C47.3203 45 49 42.8404 49 40.1786V4.82143C49 2.1596 47.3203 0 45.25 0ZM17.75 9.64286C20.5078 9.64286 22.75 12.5257 22.75 16.0714C22.75 19.6172 20.5078 22.5 17.75 22.5C14.9922 22.5 12.75 19.6172 12.75 16.0714C12.75 12.5257 14.9922 9.64286 17.75 9.64286ZM26.5 33.4286C26.5 34.4933 25.7188 35.3571 24.75 35.3571H10.75C9.78125 35.3571 9 34.4933 9 33.4286V31.5C9 28.3058 11.3516 25.7143 14.25 25.7143H14.6406C15.6016 26.2266 16.6484 26.5179 17.75 26.5179C18.8516 26.5179 19.9062 26.2266 20.8594 25.7143H21.25C24.1484 25.7143 26.5 28.3058 26.5 31.5V33.4286ZM44 28.125C44 28.567 43.7188 28.9286 43.375 28.9286H32.125C31.7812 28.9286 31.5 28.567 31.5 28.125V26.5179C31.5 26.0759 31.7812 25.7143 32.125 25.7143H43.375C43.7188 25.7143 44 26.0759 44 26.5179V28.125ZM44 21.6964C44 22.1384 43.7188 22.5 43.375 22.5H32.125C31.7812 22.5 31.5 22.1384 31.5 21.6964V20.0893C31.5 19.6473 31.7812 19.2857 32.125 19.2857H43.375C43.7188 19.2857 44 19.6473 44 20.0893V21.6964ZM44 15.2679C44 15.7098 43.7188 16.0714 43.375 16.0714H32.125C31.7812 16.0714 31.5 15.7098 31.5 15.2679V13.6607C31.5 13.2188 31.7812 12.8571 32.125 12.8571H43.375C43.7188 12.8571 44 13.2188 44 13.6607V15.2679Z" fill="white"/>
       </NavLink>
       </g>
       <defs>
       <filter id="filter0_d_280_261" x="0" y="0" width="53" height="53" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
       <feFlood floodOpacity="0" result="BackgroundImageFix"/>
       <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
       <feOffset dy="4"/>
       <feGaussianBlur stdDeviation="2"/>
       <feComposite in2="hardAlpha" operator="out"/>
       <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
       <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_280_261"/>
       <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_280_261" result="shape"/>
       </filter>
       </defs>
       </svg> 
       if(pathname==='/Statistics')
       return null                    
       else 
          return  <svg width="40" height="34" viewBox="0 0 53 53" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g filter="url(#filter0_d_280_261)">
          <NavLink exact="true" to='/Patients'>
          <path d="M45.25 0H7.75C5.67969 0 4 2.1596 4 4.82143V40.1786C4 42.8404 5.67969 45 7.75 45H45.25C47.3203 45 49 42.8404 49 40.1786V4.82143C49 2.1596 47.3203 0 45.25 0ZM17.75 9.64286C20.5078 9.64286 22.75 12.5257 22.75 16.0714C22.75 19.6172 20.5078 22.5 17.75 22.5C14.9922 22.5 12.75 19.6172 12.75 16.0714C12.75 12.5257 14.9922 9.64286 17.75 9.64286ZM26.5 33.4286C26.5 34.4933 25.7188 35.3571 24.75 35.3571H10.75C9.78125 35.3571 9 34.4933 9 33.4286V31.5C9 28.3058 11.3516 25.7143 14.25 25.7143H14.6406C15.6016 26.2266 16.6484 26.5179 17.75 26.5179C18.8516 26.5179 19.9062 26.2266 20.8594 25.7143H21.25C24.1484 25.7143 26.5 28.3058 26.5 31.5V33.4286ZM44 28.125C44 28.567 43.7188 28.9286 43.375 28.9286H32.125C31.7812 28.9286 31.5 28.567 31.5 28.125V26.5179C31.5 26.0759 31.7812 25.7143 32.125 25.7143H43.375C43.7188 25.7143 44 26.0759 44 26.5179V28.125ZM44 21.6964C44 22.1384 43.7188 22.5 43.375 22.5H32.125C31.7812 22.5 31.5 22.1384 31.5 21.6964V20.0893C31.5 19.6473 31.7812 19.2857 32.125 19.2857H43.375C43.7188 19.2857 44 19.6473 44 20.0893V21.6964ZM44 15.2679C44 15.7098 43.7188 16.0714 43.375 16.0714H32.125C31.7812 16.0714 31.5 15.7098 31.5 15.2679V13.6607C31.5 13.2188 31.7812 12.8571 32.125 12.8571H43.375C43.7188 12.8571 44 13.2188 44 13.6607V15.2679Z" fill="white"/>
          </NavLink>
          </g>
          <defs>
          <filter id="filter0_d_280_261" x="0" y="0" width="53" height="53" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dy="4"/>
          <feGaussianBlur stdDeviation="2"/>
          <feComposite in2="hardAlpha" operator="out"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_280_261"/>
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_280_261" result="shape"/>
          </filter>
          </defs>
          </svg>
  
   })()
}
       
        </div>

        {
   (() => {
      if(pathname==='/Statistics')
      return <div className='LogoutIconManager'>  <svg id="Layer_1" width="38" height="30" data-name="Layer 1" viewBox="0 0 89.6 122.88">
      <title>sign-out</title>
      <NavLink exact="true" to='/'>
      <path fill='white' d="M66.4,68.66H40.29a7.23,7.23,0,0,1,0-14.45H66.4l-8.48-9.46a7.25,7.25,0,0,1,.51-10.16,7.06,7.06,0,0,1,10.05.5L87.7,56.54a7.27,7.27,0,0,1,.06,9.72L68.48,87.77a7.05,7.05,0,0,1-10.05.51,7.25,7.25,0,0,1-.51-10.16l8.48-9.46ZM42.94,108.57a7.22,7.22,0,0,1-2.83,14.17l-3.37-.68C12.84,117.32,0,114.63,0,80.2V40.63C0,7.65,13.78,5.07,36.6.81L40.17.13A7.21,7.21,0,0,1,42.88,14.3L39.25,15c-15.46,2.89-24.8,4.63-24.8,25.65V80.2c0,22.61,8.77,24.46,25.1,27.7l3.39.67Z"/>
      </NavLink>
   </svg>
   </div>
   else
      return <div className='LogoutIcon'>  <svg id="Layer_1" width="38" height="30" data-name="Layer 1" viewBox="0 0 89.6 122.88">
         <title>sign-out</title>
         <NavLink exact="true" to='/'>
         <path fill='white' d="M66.4,68.66H40.29a7.23,7.23,0,0,1,0-14.45H66.4l-8.48-9.46a7.25,7.25,0,0,1,.51-10.16,7.06,7.06,0,0,1,10.05.5L87.7,56.54a7.27,7.27,0,0,1,.06,9.72L68.48,87.77a7.05,7.05,0,0,1-10.05.51,7.25,7.25,0,0,1-.51-10.16l8.48-9.46ZM42.94,108.57a7.22,7.22,0,0,1-2.83,14.17l-3.37-.68C12.84,117.32,0,114.63,0,80.2V40.63C0,7.65,13.78,5.07,36.6.81L40.17.13A7.21,7.21,0,0,1,42.88,14.3L39.25,15c-15.46,2.89-24.8,4.63-24.8,25.65V80.2c0,22.61,8.77,24.46,25.1,27.7l3.39.67Z"/>
         </NavLink>
      </svg>
      </div>
   })()
}
       


      </div>




 
  )
}}

export default IconBar
