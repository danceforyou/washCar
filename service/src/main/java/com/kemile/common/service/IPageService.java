//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by Fernflower decompiler)
//

package com.kemile.common.service;

import com.kemile.common.dao.IBaseDAO;
import com.kemile.common.domain.BaseDomain;
import com.kemile.common.domain.view.BizData4Page;
import com.kemile.common.utils.SqlOrderEnum;
import java.util.Map;

@SuppressWarnings("rawtypes")
public interface IPageService<D extends IBaseDAO, T extends BaseDomain> {

    BizData4Page queryPageByDataPerm(String var1, Map<String, Object> var2, int var3, int var4, int var5);

    void queryPageByDataPerm(BizData4Page var1);

    void queryPageByDataPerm(IBaseDAO var1, BizData4Page var2);

    void queryPageByDataPerm(BizData4Page var1, String var2, SqlOrderEnum var3);

}
