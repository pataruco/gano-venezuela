const HASHED_BASE_URL =
	"aHR0cHM6Ly90dnRjcmhhdTJ2bzMzNnFhNXI2NnAzYnlneTBoYXp5ay5sYW1iZGEtdXJsLnVzLWVhc3QtMS5vbi5hd3M=";

const baseUrl = new URL(atob(HASHED_BASE_URL));
const form = document.querySelector("form") as HTMLFormElement;

const resultContainer = document.querySelector(".result") as HTMLDivElement;

const getActa = async (cedula: string) => {
	try {
		baseUrl.searchParams.set("cedula", `V${cedula}`);
		const response = await fetch(baseUrl.toString());

		if (!response.ok) {
			throw new Error("Error");
		}

		const { url } = (await response.json()) as { url: string };

		return {
			success: true,
			payload: url,
		};
	} catch (error) {
		return {
			success: false,
		};
	}
};

form.addEventListener("submit", async (event) => {
	event.preventDefault();

	const formData = new FormData(form);
	const cedulaNumber = formData.get("cedula") as string;

	const { success, payload } = await getActa(cedulaNumber);

	if (!success) {
		alert("Error");
		return;
	}

	const img = document.createElement("img");

	if (payload) {
		img.setAttribute("src", payload);
		resultContainer.appendChild(img);
	}
});
