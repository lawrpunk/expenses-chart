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

    // Loop through chart items
    chartItems.forEach((item) => {
      // Function to show the chart item
      const showChartItem = () => {
        // Find the corresponding chart item to show
        const target = document.querySelector(
          `.chart-item-show[data-for="${item.getAttribute("data-for")}"]`
        );

        // Get the amount and calculate the percentage
        const amount = parseFloat(item.getAttribute("data-amount"));
        const percentage = ((amount - 3) / maxAmount) * 100;

        // Set the position and content of the chart item
        target.style.bottom = `${percentage}%`;
        target.textContent = `$${amount}`;
        target.style.display = "block";
      };

      // Function to hide the chart item
      const hideChartItem = () => {
        // Find the corresponding chart item to hide
        const target = document.querySelector(
          `.chart-item-show[data-for="${item.getAttribute("data-for")}"]`
        );

        // Hide the chart item
        target.style.display = "none";
      };

      // Mouse events
      item.addEventListener("mouseenter", showChartItem); // Show chart item on mouse enter
      item.addEventListener("mouseleave", hideChartItem); // Hide chart item on mouse leave

      // Touch events
      item.addEventListener("touchstart", (e) => {
        e.preventDefault(); // Prevent scrolling on touch devices
        showChartItem(); // Show chart item on touch start
      });

      item.addEventListener("touchend", hideChartItem); // Hide chart item on touch end
    });
  })
  .catch((error) => {
    // Handle errors during fetching or processing
    console.error("Error fetching JSON:", error);
  });
