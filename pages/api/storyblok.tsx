import { gql } from "@apollo/client";
import moment from 'moment'

export const getArchivesOverview = gql`
{
    ArticleItems {
      items {
        first_published_at
      }
      total
    }
    ArtworkItems {
      items {
        first_published_at
      }
    }
    TagsItems {
        items {
          content {
            tag
          }
        }
      }
}  
`
export const slugify = async (archives:string) => {
	var title:string
	var after:string
	var before:string
	var tag:string 
	if ( /^\d{4}$/.test(`${archives}`) == true ) {
		after = (`${archives}-01-01`)
		before = (`${archives}-12-31`);
		title = archives; 
    tag = '';
		return {after, before, title, tag};
	} else if (/\d{4}-\d{2}/.test(`${archives}`) == true )  {
		const lastDay = moment(moment(archives).endOf('month')).format('D');
		after = (`${archives}-01`)
		before = (`${archives}-${lastDay}`);
		title = moment(archives).format('MMMM YYYY'); 
    tag = '';
		return {after, before, title, tag};
	} else {
    title = (`${archives}`)
    tag = (`${archives}`)
    before = ''
    after = ''
    return {after, before, title, tag};
  };
}


interface TimelineType { year: string; months: []}
export function setDates(data:any) {
    const timeline = [] as any;
    const yearsList = [] as any;
    const monthsList = [] as any;

    // combining articles and artworks
    const articles = data?.ArticleItems.items
    const artworks = data?.ArtworkItems.items

    const raw = [...articles, ...artworks]

    // getting years
    raw.forEach((e:any) => {yearsList.push(moment(e?.first_published_at).format('YYYY'));});
    const year = yearsList.filter((f:any, index:any, arr:any) => arr.indexOf(f) == index)
    yearsList.length = 0;
    year.forEach((d:any) => {yearsList.push(d);})
    yearsList.sort((a:any,b:any) => moment(b).diff(a)) 

    // adding months
    yearsList.forEach( function (date:any) {
    let formatDate = {} as any;
    formatDate['year'] = date;
    raw.forEach((d:any) => {monthsList.push(moment(d?.first_published_at).format('YYYY-MM'));});
    const monthData = monthsList.filter((f:any) => (moment(f).format('YYYY')) == date);
    const filterMonths = monthData.filter((f:any, index:any, arr:any) => arr.indexOf(f) == index)
    formatDate['months'] = filterMonths.sort((a:any,b:any) => moment(a).diff(b)) // used to get the newest to oldest months
    timeline.push(formatDate);
    });

    return (timeline as TimelineType[]);
 }

 export const ArtworkItems = gql`
 query AllArt(
  $currentPage: Int,
  $limit: Int,
  $search_tag: String,
  $before: String,
  $after: String,)
  {
  ArtworkItems(
    first_published_at_lt: $before, 
    first_published_at_gt: $after,
    with_tag: $search_tag,
    starts_with: "artworks/",
    per_page: $limit
    page: $currentPage) 
    {
    total
    items {
      uuid
      full_slug
      first_published_at
      content {
        _uid
        name
        component
        description
        software_used
        tags
        content
      }
    }
  }
  }`


export const getArchives = gql`
query ArticleDates(
    $after: String, 
    $before: String, 
    $currentPage: Int,
    $limit: Int,
    $slug: String,
    $tag: String)
  {  
    ArticleItems(
        first_published_at_gt: $after, 
        first_published_at_lt: $before,
        starts_with: $slug,
        sort_by:"items.content.published_at", 
        per_page: $limit,
        page: $currentPage,
        with_tag: $tag,
        ) {
        items {
            id
            name
            first_published_at
            meta_data
            full_slug
            uuid
            slug
            content {
                title
                updated_at
                teaser
                subtitle
                published_at
                cover_image {
                    filename
                    copyright
                    focus
                }
            content
            component
            comments
            }
        }
        total
    }
    ArtworkItems(
        first_published_at_gt: $after, 
        first_published_at_lt: $before,
        starts_with: $slug,
        sort_by:"items.content.published_at", 
        per_page: $limit,
        page: $currentPage,
    ) {
        items {
            first_published_at
            content {
              tags
              software_used
              name
              description
              content
              component
              _uid
            }
        }
        total
    }
}
`