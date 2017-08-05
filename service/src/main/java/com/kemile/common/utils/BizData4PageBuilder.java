//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by Fernflower decompiler)
//

package com.kemile.common.utils;

import com.kemile.common.dao.IBaseDAO;
import com.kemile.common.domain.view.BizData4Page;
import java.util.List;
import java.util.Map;

public class BizData4PageBuilder {
    public BizData4PageBuilder() {
    }

    @SuppressWarnings({ "rawtypes", "unchecked" })
	public static BizData4Page createBizData4Page(IBaseDAO dao, Map<String, Object> conditions, int curPage, int offset, int rows) {
        List mainData = dao.queryPage(conditions, offset, rows, (String)null, (String)null);
        int records = dao.count(conditions);
        BizData4Page bizData4Page = new BizData4Page();
        bizData4Page.setRows(mainData);
        bizData4Page.setPage(curPage);
        bizData4Page.setRecords(records);
        int total = records / rows;
        int mod = records % rows;
        if(mod > 0) {
            ++total;
        }

        bizData4Page.setTotal(total);
        return bizData4Page;
    }
}
