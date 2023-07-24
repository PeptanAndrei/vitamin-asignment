export type ErrorComponentProps = {
    error: string | null
}
export default function ErrorComponent({error} : ErrorComponentProps) : JSX.Element{
    return (
        <div className="App-error-component">{error}</div>
    )
}