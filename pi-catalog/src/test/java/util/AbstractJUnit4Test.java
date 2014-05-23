package util;


import com.github.springtestdbunit.DbUnitTestExecutionListener;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.TestExecutionListeners;
import org.springframework.test.context.junit4.AbstractJUnit4SpringContextTests;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.transaction.TransactionalTestExecutionListener;

import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: asanchez
 * Date: 20/05/14
 * Time: 07:21 PM
 * To change this template use File | Settings | File Templates.
 */

@ContextConfiguration(locations = { AbstractTest.APP_CTX})
//@TestExecutionListeners({@TestExecutionListeners.class})
@RunWith(SpringJUnit4ClassRunner.class)
public abstract class AbstractJUnit4Test extends AbstractJUnit4SpringContextTests implements AbstractTest{

    public static final Logger logger= LoggerFactory.getLogger(AbstractJUnit4Test.class);

    protected void print(Object o){

        if(o instanceof List){

            for(Object ox: (List)o){
                logger.info("{}", ox);
            }

        }
        else{
            logger.info("{}", o);
        }

    }

}