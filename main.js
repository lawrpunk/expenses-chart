// Fetch JSON data
fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    // Array of day
    const daysOfWeek = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

    // Get the current day
    const currentDate = new Date();
    const currentDayIndex = currentDate.getDay(); // 0 (Sunday) to 6 (Saturday)
    const currentDayAbbreviation = daysOfWeek[currentDayIndex];

    // Select all elements with class "chart-item"
    const chartItems = document.querySelectorAll(".chart-item");

    // Find the maximum spending amount in the data
    const maxAmount = Math.max(...data.map((item) => item.amount));

    // Iterate through the JSON data
    data.forEach((item) => {
      // Find the corresponding chart item using the "data-for" attribute
      const chartItem = Array.from(chartItems).find(
        (el) => el.getAttribute("data-for") === item.day
      );

      // Find the chart item corresponding to the current day
      const chartItemDay = Array.from(chartItems).find(
        (el) => el.getAttribute("data-for") === currentDayAbbreviation
      );

      // Highlight the chart item for the current day
      if (chartItemDay) {
        chartItemDay.style.background = "var(--Cyan)";
      }

      // Update chart item's height based on spending amount
      if (chartItem) {
        const chartItemHeight = (item.amount / maxAmount) * 100;
        chartItem.style.height = `${chartItemHeight}%`;
        chartItem.setAttribute("data-amount", item.amount); // Store amount as data attribute
      }
    });

    // Add event listeners for mouse hover effect
    chartItems.forEach((item) => {
      item.addEventListener("mouseenter", () => {
        const target = document.querySelector(
          `.chart-item-show[data-for="${item.getAttribute("data-for")}"]`
        );
        const amount = parseFloat(item.getAttribute("data-amount"));
        const percentage = ((amount - 3) / maxAmount) * 100;
        target.style.bottom = `${percentage}%`;
        target.textContent = `$${amount}`;
        target.style.display = "block";
      });

      item.addEventListener("mouseleave", () => {
        const target = document.querySelector(
          `.chart-item-show[data-for="${item.getAttribute("data-for")}"]`
        );
        target.style.display = "none";
      });
    });
  })
  .catch((error) => {
    // Handle errors during fetching or processing
    console.error("Error fetching JSON:", error);
  });
