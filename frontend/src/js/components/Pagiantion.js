import React,{useState,useEffect} from "react";


const Pagiantion = ({
  page,
  pages,
  setPage
}) => {
  const showPages = 2;
  const [pageNumbers, setPageNumbers] = useState([]);
  useEffect(() => {
    let newPages = [];
    for (let i = (page - showPages); i <= (page + showPages); i++) {
      if(i>0 && i<= pages){
        newPages.push(i);
      }
    }
    setPageNumbers(newPages);
  }, [page,pages,setPageNumbers,showPages])
  return <>
    <nav aria-label="Page navigation example" className="text-center">
    <ul className="pagination justify-content-center">
      <li className="page-item"><button className="page-link" onClick={()=>{if(page-1>0){setPage(page-1);}}}>Previous</button></li>
      {pageNumbers.map(pageNumber=>(<li key={pageNumber} className={"page-item" + (pageNumber === page?' active':'')}><button className="page-link" onClick={()=>{setPage(pageNumber)}}>{pageNumber}</button></li>))}
      <li className="page-item"><button className="page-link" onClick={()=>{if(page+1<=pages){setPage(page+1);}}}>Next</button></li>
    </ul>
  </nav>
  </>
};
export default Pagiantion;
