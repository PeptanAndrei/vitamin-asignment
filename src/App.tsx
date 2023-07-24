import { lazy, SetStateAction, Suspense, useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { Company } from './types/Company'
import { CompanyData } from './types/CompanyData';
import LoadingComponent from './components/LoadingComponent';

const CompanyDropdown = lazy(() => import('./components/CompanyDropdown'));
const CompanyChart = lazy(() => import('./components/CompanyChart'));

function App() {
  const [companies, setCompanies] = useState<Company[] | null>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedCompanyData, setSelectedCompanyData] = useState<CompanyData[] | null>()
  const selectedCompanyHandler = (company: Company) => {
    setLoading(true);
    const url = `https://data.nasdaq.com/api/v3/datasets/WIKI/${company.dataset_code}?api_key=FVby2pSTqW1_iT5wC5QM`
    axios.get(url, {
      headers: {
        Accept: 'application/json',
      },
    }).then((response: { data: { dataset: { data: { map: (arg0: (el: number[]) => { date: number; close: number; }) => SetStateAction<CompanyData[] | null | undefined>; }; }; }; }) => {
      setSelectedCompanyData(response.data.dataset.data.map((el: number[]) => {
        return {
          "date": el[0],
          "close": el[4]
        }
      }))
      setLoading(false);
    })
      .catch((error) => {
        setLoading(false);
      })
  }
  const fetchCompanies = async () => {
    const url = 'https://data.nasdaq.com/api/v3/datasets/?database_code=WIKI&api_key=FVby2pSTqW1_iT5wC5QM'
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: 'application/json',
      },
    })
    const data = await response.json()
    console.log(data.datasets);
    setCompanies(data.datasets);
  }
  useEffect(() => {
    //on mount
    fetchCompanies();
  }, [])

  return (
    <div>
      <header>
        <h2>Company dropdown</h2>
        {companies ?
          <Suspense fallback={<LoadingComponent />}>
            <CompanyDropdown companies={companies} selectedCompanyHandler={selectedCompanyHandler}></CompanyDropdown>
          </Suspense>
          : <p>Cannot load information</p>}
      </header>
      <div className='App-chart-container'>
        {
          !loading ?
            selectedCompanyData ?
              <Suspense fallback={<LoadingComponent />}>
                <CompanyChart companyData={selectedCompanyData}></CompanyChart>
              </Suspense>
              : null
              : <LoadingComponent />}
      </div>
    </div>
  );
}

export default App;
