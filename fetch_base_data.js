
const base_info_address = "./base_info/all_project_profiles.xlsx";

export const projectlist = fetch(base_info_address)
    .then(response => response.arrayBuffer())
    .then(data => {
        // Convert the data to a workbook
        const workbook = XLSX.read(data, { type: "array" });

        // Get the first sheet
        const sheet = workbook.Sheets[workbook.SheetNames[0]];

        // Convert the sheet to JSON
        const jsonData = XLSX.utils.sheet_to_json(sheet);
        return jsonData;
    })
    .catch(error => {
        console.log(error);
    });


export const readgeojson = async function(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
};
