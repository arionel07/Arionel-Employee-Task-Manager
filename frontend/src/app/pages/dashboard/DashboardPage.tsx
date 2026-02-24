export function DashboardPage() {
	return (
		<div>
			<h1 className="text-zinc-900 dark:text-zinc-50 font-bold"> Dashboard</h1>
			<p className="my-7 text-xl text-left max-w-170 ">
				Это full-stack система управления проектами, разработанная с акцентом на
				чистую архитектуру, масштабируемость и production-ready подход.
			</p>

			<div className="">
				<ul className="flex flex-col ">
					<p className="mb-6 font-bold text-lg">Приложение позволяет:</p>
					<li className="dash-li">- создавать проекты</li>
					<li className="dash-li">- управлять участниками</li>
					<li className="dash-li">- назначать роли (Manager / Employee)</li>
					<li className="dash-li">- создавать и редактировать задачи</li>
					<li className="dash-li">- разграничивать доступ по ролям</li>
					<li className="dash-li">- работать с безопасной JWT авторизацией</li>
				</ul>
			</div>
		</div>
	)
}
