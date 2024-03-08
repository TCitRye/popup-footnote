document.addEventListener('DOMContentLoaded', function() {
    var footnoteLinks = document.querySelectorAll('.footnote-link');

    footnoteLinks.forEach(function(link) {
        link.addEventListener('mouseover', function() {
            showPopup(link);
        });

        link.addEventListener('mouseout', function() {
            hidePopup();
        });
    });

    function showPopup(link) {
        var footnoteId = link.getAttribute('href').replace('#', '');
        var footnoteContent = document.getElementById(footnoteId).textContent;
        
        var popup = document.querySelector('.popup');
        if (!popup) {
            var newPopup = document.createElement('p');
            newPopup.className = 'popup';
            
            document.body.appendChild(newPopup);
            popup = newPopup;
        }
            
        popup.textContent = footnoteContent;
        popup.style.display = 'block';

        setTimeout(function() {
            var linkRect = link.getBoundingClientRect();
            var popupRect = popup.getBoundingClientRect();
            var pRect = link.parentElement.getBoundingClientRect();

            var popupTop = linkRect.top - popupRect.height - 15;
            var popupLeft = linkRect.left;

            if (popupTop < 0) {
                popupTop = linkRect.top + 20;
            }
            if (popupLeft -pRect.left + popupRect.width > pRect.width - 15) {
                popupLeft = pRect.right - popupRect.width - 15;
            }

            popup.style.top = popupTop + 'px';
            popup.style.left = popupLeft + 'px';

            popup.style.visibility = 'visible';
        }, 0);
    }

    function hidePopup() {
        var popup = document.querySelector('.popup');
        popup.style.display = 'none';
        popup.style.visibility = 'hidden';
    }
});
