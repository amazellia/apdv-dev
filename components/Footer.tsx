import moment from "moment";
function Footer() {
    return (
        <div>
            <footer>
                Amanda Patricia Dorado Viray © {moment().format('YYYY')} <br/>
                Made with 💖 + Next.js</footer>
        </div>
    )
}
export default Footer;