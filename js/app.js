document.querySelectorAll('.view-links-btn').forEach(button => {
  button.addEventListener('click', () => {
    const semester = button.dataset.semester;
    const card = document.querySelector(`.sc-semester-card[data-semester="${semester}"]`);

    if (!card) return;

    // Remove 'active' from all cards
    document.querySelectorAll('.sc-semester-card').forEach(c => c.classList.remove('active'));

    // Add 'active' to the selected card
    card.classList.add('active');

    // Hide all courseLinksContainers
    document.querySelectorAll('.sc-semester-course-links').forEach(container => {
      container.classList.add('is-hidden');
    });

    // Show only the matching courseLinksContainer
    const containerToShow = document.getElementById(`courseLinksContainer-${semester}`);
    if (containerToShow) {
      containerToShow.classList.remove('is-hidden');
      containerToShow.scrollIntoView({ behavior: 'smooth' });
    }

    // Automatically update the dropdown using the data-term value
    const term = card.getAttribute('data-term');
    const select = document.querySelector('select[name="Terms"]');
    if (term && select) {
      select.value = term;
    }
  });
});
// Connect dropdown selection to card and content
document.querySelector('select[name="Terms"]').addEventListener('change', (e) => {
  const selectedTerm = e.target.value;
  const allCards = document.querySelectorAll('.sc-semester-card');
  const allContainers = document.querySelectorAll('.sc-semester-course-links');

  allCards.forEach(card => card.classList.remove('active'));
  allContainers.forEach(container => container.classList.add('is-hidden'));

  const matchedCard = [...allCards].find(card => card.getAttribute('data-term') === selectedTerm);
  if (matchedCard) {
    matchedCard.classList.add('active');

    const semester = matchedCard.dataset.semester;
    const containerToShow = document.getElementById(`courseLinksContainer-${semester}`);
    if (containerToShow) {
      containerToShow.classList.remove('is-hidden');
      containerToShow.scrollIntoView({ behavior: 'smooth' });
    }
  }
});