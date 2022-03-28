import React, { useEffect, useState } from 'react'

const Paginate = ({pageCount,fetchFun,currentPage,marginPages,sidePagesFromCurrent}) => {
    const numberOfPages = [];
    for (let i = 1; i <= pageCount; i++ ){
        numberOfPages.push(i);
    }

    const [filtedPages,setFiltedPages]=useState([]);


    useEffect(()=>{
        let tempPages = [...numberOfPages]
        let pages=[]

        if (marginPages !== 0){
            for (let i=0; i !== marginPages; i++){
                pages.push(tempPages[i])
            }
        }

        if (currentPage > marginPages){
            if (currentPage - marginPages < 4){
                for (let i=marginPages; i < currentPage; i++){
                    pages.push(tempPages[i])
                }
            }else{
                pages.push(tempPages[(Number(currentPage)-1)- sidePagesFromCurrent - 1])
                for (let i=sidePagesFromCurrent; i > 0; i--){
                    console.log("MPHKA STO FOR LOOP")
                    pages.push(tempPages[(Number(currentPage)-1) -i])
                }
                pages.push(Number(currentPage))
            }
        }
        

        if (pageCount - currentPage <= marginPages + sidePagesFromCurrent + 1){
            for (let i = currentPage; i < pageCount; i++){
                pages.push(tempPages[i])
            }
        }else{

            for (let i=1; i <= sidePagesFromCurrent; i++){
                pages.push(tempPages[(Number(currentPage)-1) + i])
            }
            pages.push(tempPages[(Number(currentPage)-1)+ sidePagesFromCurrent + 1])
            for (let i=Number(pageCount)-marginPages ; i<Number(pageCount); i++){
                pages.push(tempPages[i])
            }
                
        }

        setFiltedPages(pages)
    },[currentPage,pageCount])
  return (
    <nav className='flex items-center justify-center bg-sky-400 font-bold text-white text-lg py-1  rounded-md shadow-md shadow-sky-600/75 px-1 sm:px-4 w-fit mx-auto mt-10'>
        <ul className='flex '>
            <li>
            <a role="button" tabIndex="0"  onClick={() =>  1 > (Number(currentPage) - 1) ? null : fetchFun(Number(currentPage) - 1)} className='cursor-pointer rounded-sm leading-none py-[6px] px-[10px]  hidden sm:block sm:mr-6 hover:underline hover:text-sky-900/80'>&#129128;</a></li>   
            {filtedPages.map((number, index)=>{
                return <li>
                        <a role="button" key={index} id={number} tabIndex="0" onClick={ (e)=> e.target.id == currentPage ? null : fetchFun(e.target.id) } className={`cursor-pointer rounded-sm leading-none     hover:underline hover:text-sky-900/80 py-[4px] px-[8px] sm:py-[6px] sm:px-[10px] block ${currentPage == number ? "font-extrabold text-xl bg-sky-600" : null}`}>
                            {(Number(currentPage) + sidePagesFromCurrent + 1 === number && number < pageCount - marginPages) ||
                            (Number(currentPage) - sidePagesFromCurrent - 1 === number && number - 1 > marginPages) ? "..." : number}
                        </a>
                        </li>
            })}
            <li>
                <a role="button" tabIndex="0" onClick={() =>  pageCount < (Number(currentPage) + 1) ? null : fetchFun(Number(currentPage) + 1)} className='cursor-pointer rounded-sm leading-none py-[6px] px-[10px]    hidden sm:block sm:ml-6  hover:underline hover:text-sky-900/80'>&#129130;</a></li>
        </ul>
        </nav>
  )
}

export default Paginate