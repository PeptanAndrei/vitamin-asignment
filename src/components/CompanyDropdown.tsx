import { Company } from "../types/Company"

export type CompanyDropdownProps = {
    companies: Company[]
    selectedCompanyHandler: (company: Company) => void
}
export default function CompanyDropdown({ companies, selectedCompanyHandler }: CompanyDropdownProps): JSX.Element {

    return <select onChange={(e) => {
        const selectedCompany = companies?.find((el) => el.id === Number(e.target.value))
        if (selectedCompany) {
            selectedCompanyHandler(selectedCompany)
        }
    }}
        defaultValue="default"
    >
        <option value="default">Choose an option</option>
        {
            companies ? companies.filter((el) => !el.name.startsWith('Untitled Dataset')).sort((a, b) => (a.name > b.name ? 1 : -1)).map((company) => {
                return <option key={company.id} value={company.id}>{company.name}</option>

            }) : <p>Cannot load information</p>
        }
    </select>

}