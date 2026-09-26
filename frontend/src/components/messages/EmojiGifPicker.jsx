import { useEffect, useState } from "react";
import EmojiPicker from "emoji-picker-react";

const GIPHY_API_URL =
"https://api.giphy.com/v1/gifs";

const EmojiGifPicker = ({
onEmojiSelect,
onGifSelect,
}) => {
const [activeTab, setActiveTab] =
useState("emoji");

const [gifs, setGifs] = useState([]);
const [searchTerm, setSearchTerm] =
useState("");

const [loading, setLoading] =
useState(false);

const [error, setError] =
useState("");

const fetchGifs = async (query = "") => {
const apiKey =
import.meta.env.VITE_GIPHY_API_KEY;

if (!apiKey) {
setError(
"GIPHY API key is missing."
);
return;
}

setLoading(true);
setError("");

try {
const endpoint = query.trim()
? `${GIPHY_API_URL}/search`
: `${GIPHY_API_URL}/trending`;

const params = new URLSearchParams({
api_key: apiKey,
limit: "20",
rating: "pg-13",
});

if (query.trim()) {
params.append(
"q",
query.trim()
);
}

const response = await fetch(
`${endpoint}?${params.toString()}`
);

if (!response.ok) {
throw new Error(
"Failed to load GIFs."
);
}

const data =
await response.json();

setGifs(data.data || []);
} catch (error) {
console.error(
"Error fetching GIFs:",
error
);

setError(
"Unable to load GIFs. Please try again."
);

setGifs([]);
} finally {
setLoading(false);
}
};

useEffect(() => {
if (activeTab !== "gif") {
return;
}

fetchGifs();
}, [activeTab]);

useEffect(() => {
if (activeTab !== "gif") {
return;
}

const trimmedSearch =
searchTerm.trim();

if (!trimmedSearch) {
fetchGifs();
return;
}

const timer = setTimeout(() => {
fetchGifs(trimmedSearch);
}, 400);

return () => clearTimeout(timer);
}, [searchTerm]);

const handleGifClick = (gif) => {
if (!gif) {
return;
}

const gifUrl =
gif.images?.original?.url;

if (!gifUrl) {
return;
}

if (onGifSelect) {
onGifSelect({
id: gif.id,
url: gifUrl,
title:
gif.title || "GIF",
});
}
};

return (
<div className="emoji-gif-picker">
<div className="picker-tabs">
<button
type="button"
className={
activeTab === "emoji"
? "active"
: ""
}
onClick={() =>
setActiveTab("emoji")
}
>
Emoji
</button>

<button
type="button"
className={
activeTab === "gif"
? "active"
: ""
}
onClick={() =>
setActiveTab("gif")
}
>
GIFs
</button>
</div>

{activeTab === "emoji" && (
<EmojiPicker
onEmojiClick={(
emojiData
) =>
onEmojiSelect(
emojiData.emoji
)
}
theme="dark"
width="100%"
height={350}
/>
)}

{activeTab === "gif" && (
<div className="gif-picker-content">
<div className="gif-search">
<input
type="text"
value={searchTerm}
onChange={(event) =>
setSearchTerm(
event.target.value
)
}
placeholder="Search GIFs..."
maxLength={50}
/>
</div>

<div className="gif-results">
{loading && (
<div className="gif-loading">
Loading GIFs...
</div>
)}

{!loading &&
error && (
<div className="gif-error">
{error}
</div>
)}

{!loading &&
!error &&
gifs.length === 0 && (
<div className="gif-empty">
No GIFs found.
</div>
)}

{!loading &&
!error &&
gifs.map((gif) => {
const previewUrl =
gif.images
?.fixed_width
?.url ||
gif.images
?.preview_gif
?.url ||
gif.images
?.original
?.url;

if (!previewUrl) {
return null;
}

return (
<button
key={gif.id}
type="button"
className="gif-item"
onClick={() =>
handleGifClick(
gif
)
}
title={
gif.title ||
"Send GIF"
}
>
<img
src={previewUrl}
alt={
gif.title ||
"GIF"
}
loading="lazy"
/>
</button>
);
})}
</div>

<div className="giphy-attribution">
Powered by GIPHY
</div>
</div>
)}
</div>
);
};

export default EmojiGifPicker;