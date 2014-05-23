package util;

/**
 * Created with IntelliJ IDEA.
 * User: asanchez
 * Date: 20/05/14
 * Time: 07:19 PM
 * To change this template use File | Settings | File Templates.
 */

import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.TestExecutionListeners;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.transaction.TransactionalTestExecutionListener;

@ContextConfiguration(locations = { ""})
@TestExecutionListeners({TransactionalTestExecutionListener.class})
@RunWith(SpringJUnit4ClassRunner.class)
public interface AbstractTest {

    String APP_CTX="classpath:appcontext.xml";
    String APP_CTX_DS="classpath:appcontext-ds.xml";

    String TEST_START=" TEST START---------";
    String TEST_READY=" TEST READY---------";
    String TEST_END=" TEST END---------";

    final String SAMPLE_DS="classpath:sample-dataset.xml";

}