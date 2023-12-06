// Sidebar list options
const sidebarOptions = [
    { key: "home", label: "Home" },
    {
        key: "productions",
        label: "Productions",
        options: [
            { key: "", label: ""}
        ]
    },
    { key: "search", label: "Search" },
    { key: "settings", label: "Settings" },
    {
        key: "about",
        label: "About",
        options: [
            { key: "about-us", label: "About us" },
            { key: "company", label: "Company" }
        ]
    },
    {
        key: "support",
        label: "Support",
        options: [
            { key: "getting-started", label: "Getting started" },
            { key: "how-it-works", label: "How it works" }
        ]
    },
    { key: "contact", label: "Contact" }
];

const config = {
    sidebarOptions
};

export default config;