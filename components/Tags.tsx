import Grid from "@mui/material/Unstable_Grid2"
import { storyblokEditable } from "@storyblok/react";
import { ListItem } from "@mui/material";
import TagsTeaser from "./TagsTeaser";

const Tags = ({data}:any) => { 
  return (
  <Grid container columns={3} >
    {data?.content?.tag.map((x:any) => {return (
      <Grid xs={3} sm={1.5} md={1} lg={1} xl={1}  {...storyblokEditable(data)} key={x.name}>
				<ListItem key={x.uuid}>
      <TagsTeaser tag={x} slug={x.slug} />
      </ListItem>
      </Grid>
    )})}
  </Grid>
  )}
export default Tags