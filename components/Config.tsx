/*
Navigation Bar
*/

import { storyblokEditable, StoryblokComponent } from "@storyblok/react";
import Link from "next/link";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBars} from'@fortawesome/free-solid-svg-icons'

function openMobileNav(e: any) {
	e.preventDefault();
	const x:any = document.getElementById("responsiveNav");
	if (x.className === "Config_Menu") {
	  x.className += " responsive";
	} else {
	  x.className = "Config_Menu";
	}
}
const Config = ({blok}:any) => {
  return (
    <div {...storyblokEditable(blok)} className="Config_Menu" id='responsiveNav' >
       <Link href="#!" aria-label='mobile navigation open' className="icon" onClick={e => openMobileNav(e)} >
					<FontAwesomeIcon icon={faBars}/>
				</Link>
				<Link href="#!" aria-label='mobile navigation close' className="closeIcon" onClick={e => openMobileNav(e)}>
					&times;
				</Link>
          {blok.header_menu.map((nestedBlok:any) => (
            <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
          ))}
    </div>
  );
};
export default Config;