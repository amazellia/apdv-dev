import GhostContentAPI from '@tryghost/content-api'
const BLOG_URL = process.env.NEXT_PUBLIC_BLOG_URL

const api = new GhostContentAPI({
	url: BLOG_URL,
	key: process.env.NEXT_PUBLIC_CONTENT_API_KEY,
	version: 'v4.7.0'
})

// set the number of post limit for each page
const setLimit = '9'

export interface PostType {
	title: string
	slug: string
	custom_excerpt: string
	feature_image: string
	created_at: string
	tag: string | null
	reading_time: string | null
	html: string | null
	meta: {
		pagination:{
			pages: number
			page: number
		}
	}
}

// ✨ initialization() to initialise the Ghost CMS Heroku app
export async function initialization(){
	// 🛏️ fetching BLOG_URL to 'poke' Heroku apps awake first (using Free plan)
	await fetch(BLOG_URL).then((res) => { 
		console.log('=== Response status: ' + res.status + ' ===');
		// 💤 If asleep (server error 503), setting <30 secs timeout to wait for app to wake up before requesting work
		//  FYI: increase seconds (<30 secs) if response delay occurs in the future 
		if (res.status !== 200 ) {const data = setTimeout(() => {initialization()}, 27000); clearTimeout(data)}
	}) // ☕ if Heroku apps are already awake
} 

// 📚 gets a JSON list of posts according to what is filtered and its current page
export async function getPosts(setFilter?: string, setPage?:number) {
	const page = setPage || 1
	const filter = setFilter || ''
	
	const apiData = await api.posts.browse({
		limit: setLimit, 
		fields: 'title,slug,custom_excerpt,feature_image,created_at,tag',
		page: page,
		filter: filter
	}).then((res) => {
		const posts = res;
		const pages = res.meta.pagination?.pages;
		return {posts, pages};			
	}).catch((err) => console.log(err))
	return apiData
} 

// 🖋️ gets the post's content to display
export async function getPostSlug(getSlug: string) {
	const post = await api.posts.read(
		{slug: getSlug},
		{fields: 'title,reading_time,slug,html,created_at'}			
		).then((res) => {
			const data = [res]
			return data
		}).catch(err=>console.log(err));
	return post
 }

 // 🏷️ gets all the tags in Ghost CMS
 export async function getTags() {
	const tags = await api.tags.browse().catch(err=>console.log(err));
	return {tags}
 }

 // 📅 gets all posts' date
 export async function getDates() {
	const postDates = await api.posts.browse(
		{fields: 'created_at'}			
		).then((res) => {
			const dates = res
			return {dates}
		}).catch(err=>console.log(err));
	return postDates
 }
 
 // 🗃️ gets all the filtered posts selected in the Archives page
 export async function getArchivedPosts(setFilter?, setPage?:number) {
	const page = setPage || 1
	const apiData = await api.posts.browse({
		limit: setLimit, 
		fields: 'title,slug,custom_excerpt,feature_image,created_at,tag',
		page: page,
		filter: setFilter
	}).then((res) => {
		const posts = res
		const pages = res.meta?.pagination?.pages
		return {posts, pages}
	}).catch(err=>console.log(err));
	return apiData
}
// Guide to let the GhostContentAPI do the work in encoding your url: https://ghost.org/docs/content-api/javascript/