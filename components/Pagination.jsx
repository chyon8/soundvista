"use client"


import { useSearchParams } from 'next/navigation'



const Pagination = ({page,now}) => {

   
   

    

   
   // const searchParams = useSearchParams().toString()

   const searchParams = useSearchParams()

   
   
    
    //const page = searchParams.get('page')

  


    
  //  const [currentPage,setCurrentPage] = useState(now)
    const totalPages = parseInt(page);
    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);
  



    const handleClick = (pageNumber) => {
      
 
      };

  return (

    <div>
    {pageNumbers.map((pageNumber) => (
      <span key={pageNumber}>
        <a 
   
       href={(searchParams.has('mood') || searchParams.has('genre'))
       ? `/sort?${searchParams.toString().replace(/&?page=\d+/, '')}&page=${pageNumber}`
       : `?page=${pageNumber}`}
       style={{color:Number(now) === pageNumber ? "blue": 'white'}}
      
   
        onClick={() => handleClick(pageNumber)}
     
        >
        {pageNumber}
        </a>{" "}
      </span>
    ))}


  </div>





  );
  
};

export default Pagination;
