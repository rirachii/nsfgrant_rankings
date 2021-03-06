import "./App.css"
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import Table from "./components/table";
import ToggleSection from "./components/ToggleSection"
import { Button, CardBody } from 'reactstrap';
import {sub_areas, areas} from "./area_info"
import {Spinner} from 'react-bootstrap';

function App() {
  const [data, setData] = useState([]);
  const [startYear, setStartYear] = useState("2000");
  const [endYear, setEndYear] = useState("2021");
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState(false);
  const click = () => setFilter(!filter);
  // const { win_Height, win_Width } = useWindowDimensions();

  
  useEffect(() => {
    fetch(`https://research-institution-grants.herokuapp.com/api/2000-2022`)
    .then((res) => res.json())
    .then((json) => setData(json));
  }, [startYear]);

  const [checkedState, setCheckedState] = useState(
    new Array(sub_areas.length).fill(true)
  );

  const selectall = () => {
  checkedState[1] 
  ? setCheckedState(new Array(sub_areas.length).fill(false))
  : setCheckedState(new Array(sub_areas.length).fill(true));
  } 
  const selectBio = () => {
    let theArray = checkedState.slice(-27); // 5
    if (checkedState[1] === true){
      let arr1 = [false, false, false, false, false];
      theArray = arr1.concat(theArray)
      setCheckedState(theArray);
    } else{
      let arr1 = [true, true, true, true, true];
      theArray = arr1.concat(theArray)
      setCheckedState(theArray);
    }
  }
  const selectEhr = () => {
    let beg = checkedState.slice(0, 5); // 3
    let end = checkedState.slice(-24);
    if (checkedState[7] === true){
      let arr1 = [false, false, false];
      beg = beg.concat(arr1).concat(end)
      setCheckedState(beg);
    } else{
      let arr1 = [true, true, true];
      beg = beg.concat(arr1).concat(end)
      setCheckedState(beg);
    }
  }
  const selectMps = () => {
    let beg = checkedState.slice(0, 8); //5
    let end = checkedState.slice(-19);
    if (checkedState[11] === true){
      let arr1 = [false, false, false, false, false];
      beg = beg.concat(arr1).concat(end)
      setCheckedState(beg);
    } else{
      let arr1 = [true, true, true, true, true];
      beg = beg.concat(arr1).concat(end)
      setCheckedState(beg);
    }
  }
  const selectSbe = () => {
    let beg = checkedState.slice(0, 13); //3
    let end = checkedState.slice(-16);
    if (checkedState[16] === true){
      let arr1 = [false, false, false];
      beg = beg.concat(arr1).concat(end)
      setCheckedState(beg);
    } else{
      let arr1 = [true, true, true];
      beg = beg.concat(arr1).concat(end)
      setCheckedState(beg);
    }
  }
  const selectEng = () => {
    let beg = checkedState.slice(0, 16); //6
    let end = checkedState.slice(-10);
    if (checkedState[19] === true){
      let arr1 = [false, false, false, false, false, false];
      beg = beg.concat(arr1).concat(end)
      setCheckedState(beg);
    } else{
      let arr1 = [true, true, true, true, true, true];
      beg = beg.concat(arr1).concat(end)
      setCheckedState(beg);
    }
  }
  const selectGeo = () => {
    let beg = checkedState.slice(0, 22); //5
    let end = checkedState.slice(-5);
    if (checkedState[25] === true){
      let arr1 = [false, false, false, false, false];
      beg = beg.concat(arr1).concat(end)
      setCheckedState(beg);
    } else{
      let arr1 = [true, true, true, true, true];
      beg = beg.concat(arr1).concat(end)
      setCheckedState(beg);
    }
  }
  
  const selectComp = () => {
  let theArray = checkedState.slice(0, 27); //5
  if (checkedState[checkedState.length-1] === true){
    let arr1 = [false, false, false, false, false];
    theArray = theArray.concat(arr1)
    setCheckedState(theArray);
  } else{
    let arr1 = [true, true, true, true, true];
    theArray = theArray.concat(arr1)
    setCheckedState(theArray);
  }
}

  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item,
    );
    setCheckedState(updatedCheckedState);
  };


  let selected_areas = []
  function select_checkbox(){
    let index = 0;
    selected_areas = [];
    for (let t of checkedState){
      if (t === true){
        selected_areas.push(sub_areas[index])
      }
      index++
    }
  }
  select_checkbox();

  setTimeout(() => setLoading(false), 2000);

  const columns = React.useMemo(
    () => [
      {
        id: "expander",
        Cell: ({ row }) =>
          row.canExpand ? (
            <span {...row.getToggleRowExpandedProps({})}>
              {row.isExpanded ? "???" : "???"}
            </span>
          ) : null
      },
      {
        Header: "Rank",
        accessor: "Rank"
      },
      {
        Header: "Institution",
        accessor: "Institution"
      },
      {
        Header: "Grants",
        accessor: "Total"
      },
      {
        Header: "Faculties",
        accessor: "Faculties"
      },
      {
        Header: "Amount($)",
        accessor: "Amount"
      }
    ],
    []
  );

  useEffect(() => {
    // console.log(startYear, endYear, selected_areas, data);
    parse_data(startYear, endYear, selected_areas, data);
  }, [startYear, endYear, checkedState, data])
  
const filterSetting = (
  <div>
  <div className="filters">
    <select className="select_years" id="fromyear" value={startYear} onChange={(event) => {
      const selectYear = event.target.value;
      setStartYear(selectYear)
    }}>
    {[2000,2001,2002,2003,2004,
    2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020,
    2021,2022].map(start_year => (
      <option key={start_year} value={start_year}>
          From {start_year}
      </option>
    ))}
      </select>
    <select className="select_years" id="toyear" value={endYear} onChange={(event) => {
      const selectYear = event.target.value;
      setEndYear(selectYear)
    }}>
    {[2000,2001,2002,2003,2004,
    2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020,
    2021,2022].map(start_end => (
      <option key={start_end} value={start_end}>
          To {start_end}
      </option>
    ))}
    </select>
  </div>
    
    <CardBody>
      <AreaButton select={selectBio} area="Biological Sciences" />
      <AreaButton select={selectComp} area="Computer and Info Scie and Enginr" />
      <AreaButton select={selectEhr} area="Education and Human Resources" />
      <AreaButton select={selectEng} area="Engineering" />
      <AreaButton select={selectGeo} area="Geosciences" />
      <AreaButton select={selectMps} area="Mathematical/Physical Scienc" />
      <AreaButton select={selectSbe} area="Social, Behavior, and Economic Sciences" />
      <Button onClick={selectall} color="primary">Select All</Button>

      </CardBody>
    <Button className="filter-button" onClick={click} color="warning">Filter</Button>
  </div>
)

  return ( 
  <div>
    <div className="title">
      <h1>Research Grants Rankings</h1>
    </div>

    <ToggleSection section='Toggle About Section' contents={aboutSection} />
    <ToggleSection section='Toggle Filter Settings' contents={filterSetting} />

    <div className="flexbox-container">
      <div className="selection">
        <p className="select_text">Select Areas of Intrest:</p>
        <ul className="select_areas">
          {sub_areas.map((smth, index) => {
            return (
              <li className="list_areas" key={index}>
                  <div className="left-section">
                    <input
                      type="checkbox"
                      id={`custom-checkbox-${index}`}
                      name={smth}
                      value={smth}
                      checked={checkedState[index]}
                      onChange={() => handleOnChange(index)}
                    />
                    <label htmlFor={`custom-checkbox-${index}`}>
                      {areas[smth]}
                    </label>
                </div>
              </li>
            );
          }
          )}
          </ul>
      </div>

      <div className="rtable">
        {loading ? (<div className="loading_ani"><Spinner animation="border" /></div>) : <Table columns={columns} data={data_json} />}
      </div>
    </div>

  </div>
  );
}

export default App;

function AreaButton(props) {
  return (
    <Button onClick={props.select} className="area_button" color="success">{props.area}</Button>
  )
}



const aboutSection = (
    <CardBody>
    <p> 
        Hello! This web app is a work in progress and doesn't perform optimally. When navigating, please be patient. Thank you for visiting!
    </p>
    <p>
        NSF Grants Rankings is inspired by <a href="http://csrankings.org/#/fromyear/2011/toyear/2021/index?all">csrankings.org</a>, which ranks institutions based on 
        the number of publications by faculty that have appeared at the most selective conferences.
        NSF Grants Rankings acquires data from <a href="https://www.nsf.gov/awardsearch/download.jsp">nsf.gov</a> to rank institutions in the USA
        based on the total amount of funding rewarded. 
    </p>
    <p>
        The table displays the total number of grants rewarded to an institution along with all the 
        total number of faculties awarded. Clicking ??? will toggle the sub-table to an institution, showing all the individual faculty at an institution. The Areas
        column communicates which areas the faculty was rewarded in, Grants column shows the total number of grants rewarded to that individual, Adj. Count inspired 
        by csrankings.org where each grant is counted exactly once, with credit adjusted by splitting evenly across all co-Investigators,
        the score shows how much credit an individual has over the total number of grants they're rewarded. 
        Lastly, the Amount column is the total amount rewarded to one individual. 
    </p>
    <p>
        Filter Data by Year and Areas in the Filter Settings. For more information on the Areas and Sub-Areas, click <a href="https://www.nsf.gov/about/research_areas.jsp">here</a>. 
        When changing the settings, the webpage will lag. This is a known problem that needs to be improved. 
        After changing the filter settings, click the yellow "Filter" button to confirm the action.
    </p>
    </CardBody>
)


//functions
let data_json = [];
function parse_data(startYear, endYear, selected_areas, data){
  data_json = [];
  data.forEach((d) => {
    let table_data =  {
      Institution: d.institution_name,
      subRows: [
        {
          Rank: "Name",
          Institution: "Areas",
          Total: "Grants",
          Faculties: "Adj. Count",
          Amount: "Adj. Amount"
        }
      ]
    };
    let obj = {};
    let gTotal = 0;
    let amtTotal = 0;
    for (let year = startYear; year < Number(endYear) + 1; year++) {
      for (let ae of selected_areas) {
        try {
          const faculty = d[String(year)][ae]["faculties"]; // obj ==> name: [grants, adjusted count]
          gTotal += d[String(year)][ae]["area_total"];
          amtTotal += d[String(year)][ae]["amt_total"];
          Object.entries(faculty).forEach(([key, [grants, adj_count, amt]]) => {
            if (obj[key]){
              obj[key][0] = String(Number(obj[key][0]) + grants);
              obj[key][1] = String((Number(obj[key][1]) + adj_count).toFixed(1));
              obj[key][2] = String(Math.round(Number(obj[key][2]) + amt));
              if (!obj[key][3].includes(ae)){
                obj[key][3].push(", ");
                obj[key][3].push(ae);
              }
            } else{
              obj[key] = [grants, adj_count, amt, [ae]];
            }
          });
        } catch (e) {
        }
      }
    }
    var items = Object.keys(obj).map(function(key) {
      return [key, obj[key]];
    });

/*  Sorts the faculty, possible to sort by grants, adj_count, or amt.
    second[1][0] = grants, second[1][1] = adj_count, and second[1][2] = amt
*/
    items.sort(function(first, second) {
      return second[1][2] - first[1][2];
    });
    Object.entries(items).forEach(([_, value]) => {
        table_data.subRows.push({
          Rank: value.shift(),
          Total: value[0].shift(),
          Faculties: value[0].shift(),
          Amount: value[0].shift(),
          Institution: (value[0].shift()),

        });
      });
    data_json.push(table_data);
    table_data["Total"] = gTotal;
    table_data["Faculties"] = table_data["subRows"].length - 1;
    table_data["Amount"] = amtTotal;
    
    }
  );
  data_json.sort(function(a, b){
      return b["Amount"]-a["Amount"];
  });
  let ranking = 1;
  for (let each of data_json){
    each["Rank"] = ranking++;
  };
}

/*
  getWindowDimensions and useWindowDimensions gets win_Height, win_Width in
  realtime. Might be useful in the future. 
  src: https://stackoverflow.com/questions/36862334/get-viewport-window-height-in-reactjs
*/
/*
function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}
function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}
*/