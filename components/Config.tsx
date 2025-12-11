/*
Navigation Bar
*/

import { storyblokEditable, StoryblokComponent } from "@storyblok/react";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/router";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBars} from'@fortawesome/free-solid-svg-icons'

function closeMobileNav() {
	const x:any = document.getElementById("responsiveNav");
	if (!x) return;
	x.className = "Config_Menu";
	document.body.style.overflow = ''; // Restore scrolling
}

function openMobileNav(e: any) {
	e.preventDefault();
	const x:any = document.getElementById("responsiveNav");
	if (!x) return;
	
	if (x.className === "Config_Menu") {
	  x.className += " responsive";
	  document.body.style.overflow = 'hidden'; // Prevent background scrolling
	} else {
	  closeMobileNav();
	}
};

const Config = ({blok}:any) => {
  const router = useRouter();

  useEffect(() => {
    // Close mobile menu when route changes
    const handleRouteChange = () => {
      closeMobileNav();
    };

    router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router.events]);

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