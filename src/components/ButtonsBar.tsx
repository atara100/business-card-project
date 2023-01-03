interface Props{
    updateDisplay:Function;
    search:string;
    handleSearch:Function;
}

function ButtonsBar({updateDisplay,search,handleSearch}:Props) {

    return ( 
        <div className="d-flex px-5">        
          <div>

            <div className="d-flex align-items-center">
              <input className="forn-control ms-3" placeholder="Search" type="text"
              value={search} onChange={(e)=> handleSearch(e)}/>
            </div>

            <button onClick={()=>updateDisplay('grid')} className="btn btn-light mx-l"><i className="bi bi-grid-3x3-gap"></i></button>
            <button onClick={()=>updateDisplay('list')} className="btn btn-light"><i className="bi bi-list-ul"></i></button>

          </div>
        </div>
     );
}

export default ButtonsBar;