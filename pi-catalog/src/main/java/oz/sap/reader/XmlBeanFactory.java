package oz.sap.reader;

import javax.xml.stream.XMLInputFactory;
import javax.xml.stream.XMLStreamException;
import javax.xml.stream.XMLStreamReader;
import java.io.InputStream;
import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: asanchez
 * Date: 20/05/14
 * Time: 04:44 PM
 * To change this template use File | Settings | File Templates.
 */
public class XmlBeanFactory implements PIReader<List, InputStream> {


    public List parse(InputStream src) {





        return null;
    }


    public XMLStreamReader getInput(InputStream is) throws XMLStreamException{

        XMLInputFactory factory = XMLInputFactory.newInstance();
        XMLStreamReader reader =factory.createXMLStreamReader(is);

        return reader;
    }

}
