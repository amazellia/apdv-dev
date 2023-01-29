import moment from 'moment'

export const slugify = async (archive:string) => {
	var title:string
	var after:string
	var before:string
	var tag:string 
	if ( /^\d{4}$/.test(`${archive}`) == true ) {
		after = (`${archive}-01-01`)
		before = (`${archive}-12-31`);
		title = archive; 
    tag = '';
		return {after, before, title, tag};
	} else if (/\d{4}-\d{2}/.test(`${archive}`) == true )  {
		const lastDay = moment(moment(archive).endOf('month')).format('D');
		after = (`${archive}-01`)
		before = (`${archive}-${lastDay}`);
		title = moment(archive).format('MMMM YYYY'); 
    tag = '';
		return {after, before, title, tag};
	} else {
    title = (`${archive.replaceAll("-"," ")}`)
    tag = (`${archive}`)
    before = ''; after = ''
    return {after, before, title, tag};
  };
}

interface TimelineType { year: string; months: []}
export function setDates(data:any) {
    const timeline = [] as any;
    const yearsList = [] as any;
    const monthsList = [] as any;

    const raw = data?.ContentNodes?.items
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