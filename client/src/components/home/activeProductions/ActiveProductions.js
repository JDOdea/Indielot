import ActiveProductionsList from "./ActiveProductionsList";

export default function ActiveProductions({ loggedInUser }) {

    return (
        <div className="activeProductions">
            <ActiveProductionsList loggedInUser={loggedInUser}/>
        </div>
    )
}