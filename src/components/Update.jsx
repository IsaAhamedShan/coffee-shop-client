import InformationField from "./sharedComponents/InformationField";


const Update = () => {
    return (
        <div>
            <h1 className="text-3xl">Update Coffee</h1>
            <InformationField></InformationField>
            {/* informationField e use korbo but ei khetre check korbo je update page e ashsi kina. jodi ashi then existing value amra put kore dibo. easy solution */}
        </div>
    );
};

export default Update;