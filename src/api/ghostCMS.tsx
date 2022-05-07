import GhostContentAPI from '@tryghost/content-api'

const api = new GhostContentAPI({
	url: process.env.NEXT_PUBLIC_BLOG_URL,
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

export async function getPosts(setFilter?: string, setPage?:number) {	 //export const getStaticProps
	const page = setPage || 1
	const filter = setFilter || ''
		
		const apiData = await api.posts.browse({
			limit: setLimit, 
			fields: 'title,slug,custom_excerpt,feature_image,created_at,tag',
			page: page,
			filter: filter
		}).then((res) => {
			const posts = res
			const pages = res.meta?.pagination?.pages
			return {posts, pages}
		}).catch(err=>console.log(err));
		return apiData
} 

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

 export async function getTags() {
	const tags = await api.tags.browse().catch(err=>console.log(err));
	return {tags}
 }

 export async function getDates() {
	const postDates = await api.posts.browse(
		{fields: 'created_at'}			
		).then((res) => {
			const dates = res
			return {dates}
		}).catch(err=>console.log(err));
	return postDates
 }
 
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

//https://www.youtube.com/watch?v=u6VTP244Puw&list=PL9_OU-1M9E_uVY-FW0GZr7FwqYeOouzKh&index=4

// Guide to let the GhostContentAPI do the work in encoding your url
//https://ghost.org/docs/content-api/javascript/