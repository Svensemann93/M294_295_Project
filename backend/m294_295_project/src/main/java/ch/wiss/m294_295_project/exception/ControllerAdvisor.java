/*
hier wird eine Exception-Handler-Klasse definiert, die auf bestimmte Ausnahmen reagiert und entsprechende
Fehlermeldungen zurückgibt.
Diese Klasse ist mit @ControllerAdvice annotiert, was bedeutet, dass sie globale Ausnahmebehandlung für alle Controller
in der Anwendung bereitstellt.
Die Methoden in dieser Klasse überschreiben die Standard-Fehlerbehandlung von Spring Boot und geben benutzerdefinierte
Fehlermeldungen zurück.
*/
package ch.wiss.m294_295_project.exception;

import java.util.HashMap;
import java.util.Map;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

/*
@ControllerAdvice macht diese Klasse zu einem globalen Exception-Handler,
der auf alle Controller in der Anwendung angewendet wird.
extends bedeutet, dass diese Klasse von ResponseEntityExceptionHandler erbt,
was die Standard-Fehlerbehandlung von Spring Boot erweitert.
*/
@ControllerAdvice
public class ControllerAdvisor extends ResponseEntityExceptionHandler {

    /*
    @Override bedeutet, dass diese Methode die Standard-Fehlerbehandlung von Spring Boot überschreibt.
    protected bedeutet, dass diese Methode nur innerhalb dieser Klasse und in Unterklassen sichtbar ist.
    handleMissingServletRequestParameter wird aufgerufen, wenn ein erforderlicher Request-Parameter fehlt.
    ex ist die Ausnahme, die ausgelöst wurde, wenn ein erforderlicher Parameter fehlt.
    HTTPHeaders sind die Header der HTTP-Antwort, die zurückgegeben wird.
    status ist der HTTP-Statuscode, der zurückgegeben wird.
    request ist das WebRequest-Objekt, das Informationen über die aktuelle Anfrage enthält.
    Map<String, String> errors ist eine Map, die die Fehlermeldungen speichert.
    return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST) gibt eine ResponseEntity mit dem Status BAD_REQUEST (400) zurück,
    die die Fehlermeldungen enthält.
    */
    @Override
    protected ResponseEntity<Object> handleMissingServletRequestParameter(MissingServletRequestParameterException ex,
            HttpHeaders headers, HttpStatusCode status, WebRequest request) {
        Map<String, String> errors = new HashMap<>();
        errors.put("error", ex.getMessage());

        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    }

    /*
    @Override bedeutet, dass diese Methode die Standard-Fehlerbehandlung von Spring Boot überschreibt.
    protected bedeutet, dass diese Methode nur innerhalb dieser Klasse und in Unterklassen sichtbar ist.
    ResponseEntityExceptionHandler ist eine Basisklasse, die die Standard-Fehlerbehandlung von Spring Boot bereitstellt.
    handleMethodArgumentNotValid wird aufgerufen, wenn die Validierung von Request-Parametern fehlschlägt.
    ex ist die Ausnahme, die ausgelöst wurde, wenn die Validierung fehlschlägt.
    HTTPHeaders sind die Header der HTTP-Antwort, die zurückgegeben wird.
    Map<String, String> errors ist eine Map, die die Fehlermeldungen speichert.
    return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST) gibt eine ResponseEntity mit dem Status BAD_REQUEST (400) zurück,
    die die Fehlermeldungen enthält.
    Im Unterschied zu handleMissingServletRequestParameter wird hier die BindingResult-Objekt verwendet,
    um alle Validierungsfehler zu sammeln und zurückzugeben. Das bedeutet, dass alle Felder, die nicht den Validierungsregeln
    entsprechen, in der Map errors gespeichert werden. Der Vorteil dieser Methode ist, dass sie detaillierte Fehlermeldungen für jedes
    fehlerhafte Feld zurückgibt, anstatt nur eine allgemeine Fehlermeldung
    */
    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex,
            HttpHeaders headers, HttpStatusCode status, WebRequest request) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });

        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    }
}

/*
Fazit:
Wir haben hier beide Methoden handleMissingServletRequestParameter und handleMethodArgumentNotValid überschrieben,
um benutzerdefinierte Fehlermeldungen zurückzugeben, wenn ein erforderlicher Request-Parameter fehlt oder die Validierung
von Request-Parametern fehlschlägt.
Die erste Methode gibt eine allgemeine Fehlermeldung zurück, wenn ein erforderlicher Parameter fehlt,
während die zweite Methode detaillierte Fehlermeldungen für jedes fehlerhafte Feld zurückgibt.
Die erste Methode wird aufgerufen, wenn ein erforderlicher Request-Parameter fehlt,
was bedeutet, dass der Benutzer einen Parameter nicht angegeben hat, der für die Verarbeitung der Anfrage erforderlich ist.
Ausgelöst wird die zweite Methode, wenn die Validierung von Request-Parametern fehlschlägt,
was bedeutet, dass die übergebenen Daten nicht den Validierungsregeln entsprechen.
Dies ermöglicht es uns, die Fehlerbehandlung in unserer Anwendung zu verbessern und den Benutzern bessere Rückmeldungen zu geben,
wenn sie ungültige Daten senden.
*/
