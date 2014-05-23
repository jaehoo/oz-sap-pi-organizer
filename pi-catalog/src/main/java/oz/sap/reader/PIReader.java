package oz.sap.reader;

/**
 * Created with IntelliJ IDEA.
 * User: asanchez
 * Date: 20/05/14
 * Time: 04:47 PM
 * To change this template use File | Settings | File Templates.
 */
public interface PIReader<T, P>{

    /**
     * Define process to convert input source to output result
     * @param src source to parse
     * @return out
     */
    public T parse(P src);


}
