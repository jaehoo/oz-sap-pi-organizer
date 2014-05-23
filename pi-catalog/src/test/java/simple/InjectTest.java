package simple;

import org.junit.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.test.context.junit4.AbstractJUnit4SpringContextTests;
import util.AbstractJUnit4Test;
import util.AbstractTest;

import javax.annotation.Resource;

/**
 * Created with IntelliJ IDEA.
 * User: asanchez
 * Date: 20/05/14
 * Time: 07:25 PM
 * To change this template use File | Settings | File Templates.
 */
public class InjectTest extends AbstractJUnit4Test{


    @Resource(name="testText")
    private TestBean text;

    public static final Logger LOG = LoggerFactory.getLogger(InjectTest.class);



    @Test
    public void testText() throws Exception {

        LOG.info("Injected Text:{}", text.getText());

    }
}
