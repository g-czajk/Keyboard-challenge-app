# Aplikacja "Keyboard Challenge"

Celem aplikacji jest pomiar czasu wpisywania wylosowanego tekstu i zapisanie najlepszych wyników. 

## Krótki opis sposobu działania aplikacji 

1. Po załadowaniu aplikacji na ekranie widoczne są: okno zawierające opis zasad gry, panel do wyboru długości tekstu, panel zawierający najlepsze wyniki oraz zegar (wyzerowany).

1. Po kliknięciu w preferowaną długość tekstu, okno z zasadami gry znika i losowany jest tekst o wybranej długości. 

1. Teksty przechowywane są w 3 tablicach (każda z tablic zawiera teksty o danej długości). Tekst losowany jest przy pomocy `Math.random()`, jako indeks z jednej z 3 tablic, a następnie jest usuwany z tablicy przy pomocy `splice()` - dany tekst można więc wylosować tylko raz. 

1. Wylosowany tekst pojawia się jako `textContent` w panelu z lewej strony ekranu. Poniżej tekstu znajduje się `<textarea>` do przepisania tekstu. 

1. Kliknięcie w `<textarea>` (event `'focus'`) uruchamia zegar. Zegar działa na zasadzie inkrementacji zmiennej `time` od wartości 0 co określony `setInterval()`, wynoszący 10ms.

1. W momencie, gdy wprowadzony w `<textarea>` tekst odpowiada w 100% wylosowanemu tekstowi widocznemu na ekranie (`text.textContent === textArea.value`), zegar zatrzymuje się, a na ekranie pojawia się panel pokazujący uzyskany czas oraz informację o rekordzie, jeżeli został pobity. 

1. Czas zapisywany jest w panelu rekordów, jeżeli: (a) brak jest dotychczas jakiegokolwiek uzyskanego czasu dla danej kategorii tekstu, lub (b) uzyskany czas jest niższy niż najlepszy dotychczas uzyskany czas w danej kategorii.

1. Dane o najlepszych wynikach przechowywane są w obiekcie `scoreboard` i wyświetlane w panelu rekordów. Dane te zapisywane są też w `localStorage`. Po każdym uruchomieniu (odświeżeniu strony) program sprawdza, czy w `localStorage` zostały zapisane wyniki z poprzednich gier - jeżeli tak, obiekt `scoreboard` zostaje zaktualizowany o poprzednie wyniki. Dane aplikacji z `localStorage` można wyczyścić klijakąc w przycisk "Restart" - spowoduje to również odświeżenie strony i załadowanie gry od nowa.