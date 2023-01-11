let videoId: any;
let youTube: boolean = false;
export default function Video(blok:any) {
    const fetchVideo = (blok:any) => {
        if (blok?.video?.startsWith("https://www.youtube.com/watch?v=")) {
            youTube = true;
            return (videoId=`https://www.youtube.com/embed/${blok.video.split("=")[1]}`)
        } 
        if (blok?.video?.startsWith("https://youtu.be/")) {
            youTube = true;    
            return (videoId=`https://www.youtube.com/embed/${blok.video.split("/")[3]}`)
        };
    }
    fetchVideo(blok);
    return (
    <div className="made-in-ny">
        {youTube && <iframe 
        width="100%"
        height={480}
        src={`${videoId}`}
        title="video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen={true}
        />}
    </div>      
    )
}