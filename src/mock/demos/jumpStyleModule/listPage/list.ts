export default {
  name:'ListView',
  designProps:{
    //isDesigning:true,
    //query:null,
  },
  props:{
    variant:'outlined',
    //elevation:6,
       
  },
  children:[
    {
      name:'ListViewToolbar',
      children:[
        {
          name:'ListViewFilter',
        },
        {
          name:'ListViewBatchCommads',
        }
      ]
    },
    {
      name:'ListViewBody',
    }
  ],      
}