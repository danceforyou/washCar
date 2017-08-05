//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by Fernflower decompiler)
//

package com.kemile.common.service.impl;

import com.kemile.common.dao.IBaseDAO;
import com.kemile.common.domain.BaseDomain;
import com.kemile.common.domain.view.BizData4Page;
import com.kemile.common.service.IPageService;
import com.kemile.common.service.impl.AbstractBaseService;
import com.kemile.common.utils.BizData4PageBuilder;
import com.kemile.common.utils.SqlOrderEnum;
import java.util.List;
import java.util.Map;

@SuppressWarnings({ "unchecked", "rawtypes" })
public abstract class AbstractPageService<D extends IBaseDAO, T extends BaseDomain>
		extends AbstractBaseService<D, T> implements IPageService<D, T> {
	
	public AbstractPageService() {
	}

	public BizData4Page queryPageByDataPerm(String resUri,
			Map<String, Object> conditions, int curPage, int offset, int rows) {
		return BizData4PageBuilder.createBizData4Page(this.getDao(),
				conditions, curPage, offset, rows);
	}

	public BizData4Page queryPageByDataPerm(String resUri,
			Map<String, Object> conditions, int curPage, int offset, int rows,
			String orderBy, SqlOrderEnum sqlOrderEnum) {
		return BizData4PageBuilder.createBizData4Page(this.getDao(),
				conditions, curPage, offset, rows);
	}

	public void queryPageByDataPerm(BizData4Page bizData4Page, String orderBy,
			SqlOrderEnum sqlOrderEnum) {
		int offset = (bizData4Page.getPage() - 1) * bizData4Page.getPagesize();
		int rows = bizData4Page.getPagesize();
		List mainData = this.getDao().queryPage(bizData4Page.getConditions(),
				offset, rows, orderBy, sqlOrderEnum.getAction());
		int records = this.getDao().count(bizData4Page.getConditions());
		bizData4Page.setRows(mainData);
		bizData4Page.setPage(bizData4Page.getPage());
		bizData4Page.setRecords(records);
		int total = records / rows;
		int mod = records % rows;
		if (mod > 0) {
			++total;
		}

		bizData4Page.setTotal(total);
	}

	public void queryPageByDataPerm(BizData4Page bizData4Page) {
		int offset = (bizData4Page.getPage() - 1) * bizData4Page.getPagesize();
		int rows = bizData4Page.getPagesize();
		List mainData = this.getDao().queryPage(bizData4Page.getConditions(),
				offset, rows, (String) null, (String) null);
		int records = this.getDao().count(bizData4Page.getConditions());
		bizData4Page.setRows(mainData);
		bizData4Page.setPage(bizData4Page.getPage());
		bizData4Page.setRecords(records);
		int total = records / rows;
		int mod = records % rows;
		if (mod > 0) {
			++total;
		}

		bizData4Page.setTotal(total);
	}

	public void queryPageByDataPerm(IBaseDAO baseDAO, BizData4Page bizData4Page) {
		int offset = (bizData4Page.getPage() - 1) * bizData4Page.getPagesize();
		int rows = bizData4Page.getPagesize();
		List mainData = baseDAO.queryPage(bizData4Page.getConditions(), offset,
				rows, (String) null, (String) null);
		int records = baseDAO.count(bizData4Page.getConditions());
		bizData4Page.setRows(mainData);
		bizData4Page.setPage(bizData4Page.getPage());
		bizData4Page.setRecords(records);
		int total = records / rows;
		int mod = records % rows;
		if (mod > 0) {
			++total;
		}

		bizData4Page.setTotal(total);
	}

	public void queryPageByDataPerm(IBaseDAO baseDAO,
			BizData4Page bizData4Page, String orderBy, SqlOrderEnum sqlOrderEnum) {
		int offset = (bizData4Page.getPage() - 1) * bizData4Page.getPagesize();
		int rows = bizData4Page.getPagesize();
		List mainData = baseDAO.queryPage(bizData4Page.getConditions(), offset,
				rows, orderBy, sqlOrderEnum.getAction());
		int records = baseDAO.count(bizData4Page.getConditions());
		bizData4Page.setRows(mainData);
		bizData4Page.setPage(bizData4Page.getPage());
		bizData4Page.setRecords(records);
		int total = records / rows;
		int mod = records % rows;
		if (mod > 0) {
			++total;
		}

		bizData4Page.setTotal(total);
	}
}
